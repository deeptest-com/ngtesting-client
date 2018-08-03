import { Input, Component, OnInit, OnDestroy, AfterViewInit, Renderer2, EventEmitter, Output, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

import { ToastyService, ToastOptions } from 'ng2-toasty';
import { GlobalState } from '../../../global.state';
import { Deferred } from './helpers';

import { CONSTANT } from '../../../utils/constant';
import { Utils, logger } from '../../../utils/utils';

import { RouteService } from '../../../service/route';
import { PrivilegeService } from '../../../service/privilege';
import { ZtreeService } from './ztree.service';

declare var jQuery;

@Component({
  selector: 'ztree',
  templateUrl: './ztree.html',
  styleUrls: ['./styles.scss',
    '../../../../assets/vendor/ztree/css/zTreeStyle/zTreeStyle.css'],
  providers: [ZtreeService],
})
export class ZtreeComponent implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'ZtreeComponent';

  @Input() projectId: any;
  @Input() caseProjectId: any;
  @Input() treeSettings: any;
  settings: any;
  treeHeight: number;

  @Output() renameEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() moveEvent: EventEmitter<any> = new EventEmitter<any>();

  private disposersForDragListeners: Function[] = [];
  childrenCount: any = {};

  queryForm: FormGroup;
  queryModel:any = { keywords: '', projectId: '' };

  ztree: any;
  checkCount: number;
  keywords: string = '';
  isExpanded: boolean = false;
  sonSign: boolean = false;
  isDragging: boolean = false;
  isToCopy: boolean = false;

  log: any;
  newCount: number = 0;
  className: string = 'dark';
  autoExpandNode: any;
  currNode: any;

  @Output() projectChanged = new EventEmitter<any>();
  @Input() brotherProjects: any[] = [];

  _treeModel: any;
  @Input() set treeModel(model: any) {
    if (!model) {
      return;
    }
    this._state.notifyDataChanged('case.' + this.settings.usage, { node: null, random: Math.random() });

    _.merge(this.settings, this.treeSettings);
    this.isExpanded = this.settings.isExpanded;
    this.sonSign = this.settings.sonSign;

    if (this.settings.usage == 'selection' || this.treeSettings.readonly) {
      this.settings.view.addHoverDom = null;
      this.settings.view.removeHoverDom = null;
      this.settings.edit.enable = false;
    }
    if (this.settings.usage == 'selection') {
      this.settings.check = {
        enable: true,
        chkboxType: { 'Y': 'ps', 'N': 'ps' },
      };
    }

    this._treeModel = model;
    this.ztree = jQuery.fn.zTree.init($('#tree'), this.settings, this._treeModel);
    this.ztree.expandNode(this.ztree.getNodes()[0], this.isExpanded, this.sonSign, true);

    if (this.settings.jumpTo) {
      this.jumpTo(this.settings.jumpTo);
    }
  }

  public constructor(private _state: GlobalState, private _routeService: RouteService,
                     @Inject(Renderer2) private renderer: Renderer2, private fb: FormBuilder,
                     private privilegeService: PrivilegeService, private toastyService: ToastyService,
                     @Inject(ZtreeService) private ztreeService: ZtreeService) {
    this.treeHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT
      + CONSTANT.ZTREE_TOOOLBAR_HEIGHT);

    this.queryForm = this.fb.group(
      {
        'projectId': ['', []],
        'keywords': ['', []],
      }, {},
    );

    this.settings = {
      usage: null,
      isExpanded: null,

      view: {
        addHoverDom: this.addHoverDom,
        removeHoverDom: this.removeHoverDom,
        selectedMulti: false,
        fontCss: this.setFontCss,
      },
      edit: {
        enable: true,

        showRemoveBtn: this.showRemoveBtn,
        showRenameBtn: this.showRenameBtn,

        editNameSelectAll: true,
        renameTitle: '编辑',
        removeTitle: '删除',
        drag: {
          autoExpandTrigger: true,
        },
      },
      data: {
        simpleData: {
          enable: true,
        },
      },
      callback: {
        onClick: this.onClick,
        beforeRemove: this.beforeRemove,
        onRemove: this.onRemove,
        onRename: this.onRename,
        onDrag: this.onDrag,
        beforeDrop: this.beforeDrop,
        onDrop: this.onDrop,
        onCheck: this.onCheck,
        onExpand: this.onExpand,
      },
    };

  }

  public ngOnInit(): void {
    this.queryModel.projectId = this.projectId;

    this._state.subscribe(CONSTANT.EVENT_CASE_JUMP, this.eventCode, (id: number) => {
      logger.log(CONSTANT.EVENT_CASE_JUMP);
      this.jumpTo(id + '');
    });

    this._state.subscribe(CONSTANT.EVENT_CASE_UPDATE, this.eventCode, (data: any) => {
      const testCase = data.node;

      if (testCase) {
        const node = this.ztree.getNodeByParam('id', testCase.id, null);

        node.name = testCase.name;
        node.status = testCase.status;
        node.reviewResult = testCase.reviewResult;
        this.ztree.updateNode(node);
      }
    });
  }

  ngAfterViewInit() {
    this.disposersForDragListeners.push(this.renderer.listen('document', 'keyup', this.copyKeyup.bind(this)));
    this.disposersForDragListeners.push(this.renderer.listen('document', 'keydown', this.copyKeyDown.bind(this)));

    // 避免前面的赋值触发事件
    setTimeout(() => {
      this.queryForm.controls['keywords'].valueChanges.debounceTime(CONSTANT.DebounceTime)
        .subscribe(values => this.onKeywordsChange(values));
      this.queryForm.controls['projectId'].valueChanges.debounceTime(CONSTANT.DebounceTime)
        .subscribe(values => this.onProjectChange(values));
    }, 500);
  }
  copyKeyup(e): any {
    this.isToCopy = false;
  }
  copyKeyDown(e): any {
    this.isToCopy = true;
  }
  public ngOnDestroy(): void {
    this.disposersForDragListeners.forEach(dispose => dispose());
  }

  expandOrNot() {
    if (!(this.isExpanded && this.sonSign)) {
      this.isExpanded = true;
      this.sonSign = true;

      this.ztree.expandAll(true);
    } else {
      this.isExpanded = true;
      this.sonSign = false;

      this.ztree.expandAll(false);
    }
  }

  setFontCss (treeId, treeNode) {
    const css: any = {};
    css.color = '#333333';
    if (treeNode.status == 'pass' || treeNode.reviewResult) {
      css.color = '#209e91';
    } else if (treeNode.status == 'fail' || treeNode.reviewResult == false) {
      css.color = '#e85656';
    } else if (treeNode.status == 'block') {
      css.color = '#dfb81c';
    }
    return css;
  }
  onClick = (event, treeId, treeNode) => {
    const textarea = jQuery('textarea#test-step-input');
    if (textarea.length > 0) {
      if (!confirm('确认放弃未保存的用例信息？')) {
        this.ztree.selectNode(this.currNode);
        return;
      }
    }
    this.currNode = treeNode;
    this.notifyCaseChange(treeNode);
  }
  notifyCaseChange = (node: any) => {
    this.childrenCount = { notReview: 0, reviewPass: 0, reviewFail: 0 };
    this.countChildren(node);

    this._state.notifyDataChanged('case.' + this.settings.usage,
      { node: node, childrenCount: this.childrenCount, random: Math.random() });
  }
  countChildren = (treeNode) => {
    logger.log(treeNode.name, treeNode.isParent, !treeNode.isLeaf);
    if (treeNode.isParent){
      for (const obj in treeNode.children) {
        this.countChildren(treeNode.children[obj]);
      }
    } else {
      // 统计用例类型
      if (!this.childrenCount[treeNode.type]) {
        this.childrenCount[treeNode.type] = 0;
      }
      this.childrenCount[treeNode.type] = this.childrenCount[treeNode.type] + 1;

      if (treeNode.status) {
        if (!this.childrenCount[treeNode.status]) {
          this.childrenCount[treeNode.status] = 0;
        }
        this.childrenCount[treeNode.status] = this.childrenCount[treeNode.status] + 1;
      }

      // 统计用例评审状态
      if (treeNode.reviewResult == true) {
        this.childrenCount['reviewPass'] = this.childrenCount['reviewPass'] + 1;
      } else if (treeNode.reviewResult == false) {
        this.childrenCount['reviewFail'] = this.childrenCount['reviewFail'] + 1;
      } else {
        this.childrenCount['notReview'] = this.childrenCount['notReview'] + 1;
      }
    }
  }

  addHoverDom = (treeId, treeNode) => {
    if (!this.privilegeService.hasPrivilege('test_case-maintain') || this.settings.usage == 'exe') { return false; }

    const sObj = $('#' + treeNode.tId + '_span');

    if (treeNode.editNameFlag || $('#addBtn_' + treeNode.tId).length > 0) return;
    const addStr = "<span class='button add' id='addBtn_" + treeNode.tId
      + "' title='添加' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    logger.log('treeNode.isShowDeleteBut', treeNode);

    const btn = jQuery('#addBtn_' + treeNode.tId);
    if (btn) btn.bind('click', () => {
      const newNode = this.ztree.addNodes(treeNode, {id: -1 * this.newCount++, pId: treeNode.id, name: '新用例',
        type: 'functional', priority: 2, estimate: undefined});
      this.ztree.editName(newNode[0]);
      return false;
    });
  }
  removeHoverDom = (treeId, treeNode) => {
    $('#addBtn_' + treeNode.tId).unbind().remove();
  }

  onRename = (e, treeId, treeNode, isCancel) => {
    const deferred = new Deferred();
    deferred.promise.then((data) => {
      logger.log('success to rename', data);
      treeNode.id = data.id;
      treeNode.entityId = data.entityId;
      treeNode.ordr = data.ordr;

      treeNode.tm = new Date().getTime();

      this._state.notifyDataChanged('case.' + this.settings.usage, { node: _.clone(treeNode), random: Math.random() });
    }).catch((err) => { logger.log('err', err); });

    this.renameEvent.emit({
      data: treeNode,
      deferred: deferred,
    });
  }

  beforeRemove = (treeId, treeNode) => {
    this.className = (this.className === 'dark' ? '' : 'dark');
    this.ztree.selectNode(treeNode);
    return confirm('确认删除名为"' + treeNode.name + '"的用例吗？');
  }
  onRemove = (e, treeId, treeNode) => {
    const deferred = new Deferred();
    const pid = treeNode.pId;

    deferred.promise.then((data) => {
      const node = this.ztree.getNodeByParam('id', pid, null);

      // if (node.children.length == 0) {
      //   this.ztree.removeNode(node);
      // }
      console.log('success to remove');
      this._state.notifyDataChanged('case.' + this.settings.usage, { node: null, random: Math.random() });
    }).catch((err) => { logger.log('err', err); });

    this.removeEvent.emit({
      data: treeNode,
      deferred: deferred,
    });
  }
  onDrag = (event, treeId, treeNodes) => {
    this.isDragging = true;
  }

  beforeDrop = (treeId, treeNodes, targetNode, moveType, isCopy) => {
    this.isDragging = false;
    if (targetNode.level == 0 && moveType != 'inner') {
      return false;
    } else {
      return true;
    }
  }
  onDrop = (event, treeId, treeNodes, targetNode, moveType, isCopy) => {
    this.isDragging = false;
    if (!targetNode) {
      return;
    }

    const deferred = new Deferred();
    deferred.promise.then((data) => {
      logger.log('success to move', data);
      this._state.notifyDataChanged(CONSTANT.EVENT_CASE_CHANGE, { node: data, random: Math.random() });

      if (isCopy) {
        let parentNode;
        if (moveType == 'inner') {
          parentNode = targetNode;
        } else {
          parentNode = targetNode.getParentNode();
        }
        logger.log('parentNode', parentNode);
        const copyiedNode = this.ztree.getNodesByParam('id', treeNodes[0].id, parentNode)[0];
        logger.log('copyiedNode', copyiedNode);

        copyiedNode.id = data.id;
        copyiedNode.pId = data.pId;

        if (treeNodes[0].isParent) {
          // 更新新节点的属性
          this.updateCopiedNodes(copyiedNode, data);
        }
      }

    }).catch((err) => { logger.log('err', err); });

    this.moveEvent.emit({
      data: { pId: treeNodes[0].pId, srcId: treeNodes[0].id, targetId: targetNode.id,
        moveType: moveType, isCopy: isCopy },
      deferred: deferred,
    });
  }

  onExpand = (event, treeId, treeNode) => {
    if (treeNode === this.autoExpandNode) {
      this.className = (this.className === 'dark' ? '' : 'dark');
    }
  }
  onCheck = () => {
    let i = 0;
    this.ztree.getCheckedNodes(true).forEach((value, index, array) => {
      if (!value.isParent) {
        i++;
      }
    });
    this.checkCount = i;
  }
  selectAll = () => {
    this.ztree.checkAllNodes(true);
    this.onCheck();
  }
  reset = () => {
    this.ztree.checkAllNodes(false);
    this.onCheck();
  }

  getTime = () => {
    const now = new Date(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds(),
      ms = now.getMilliseconds();
    return (h + ':' + m + ':' + s + ' ' + ms);
  }

  onKeywordsChange(values: string) {
    if (!this.ztree) { return; }

    this.keywords = values;
    let nodes = this.ztree.getNodesByParam('isHidden', true);
    this.ztree.showNodes(nodes);

    nodes = this.ztree.getNodesByFilter((node) => {
      return this.keywords && !node.isParent && node.name.indexOf(this.keywords) < 0;
    });
    this.ztree.hideNodes(nodes);
  }
  onProjectChange(id: number) {
    if (id) {
      this.queryModel.projectId = id;
      this.projectChanged.emit(id);
    }
  }

  updateCopiedNodes(node: any, data: any) {
    logger.log('===', node.id, data.id);

    node.id = data.id;
    node.pId = data.pId;

    for (let i = 0; i < node.children.length; i++) {
      this.updateCopiedNodes(node.children[i], data.children[i]);
    }
  }
  jumpTo(id: string) {
    this._routeService.gotoCase(id);

    const node = this.ztree.getNodeByParam('id', id, null);
    if (node) {
      this.ztree.selectNode(node);
      this.notifyCaseChange(node);
    } else {
      const toastOptions: ToastOptions = {
        title: '未找到用例',
        timeout: 2000,
      };
      this.toastyService.warning(toastOptions);
    }

  }

  showRemoveBtn = (treeId, treeNode) => {
    return this.treeSettings.usage != 'exe' && this.privilegeService.hasPrivilege('test_case-delete') && !!treeNode.pId;
  }

  showRenameBtn = (treeId, treeNode) => {
    return this.privilegeService.hasPrivilege('test_case-maintain');
  }

}
