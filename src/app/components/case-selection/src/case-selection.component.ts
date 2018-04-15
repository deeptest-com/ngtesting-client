import * as _ from 'lodash';

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../utils/constant';

import { ZtreeService } from '../../ztree/src/ztree.service';
import { SuiteService } from '../../../service/suite';
import { CaseService } from '../../../service/case';

@Component({
  selector: 'case-selection',
  templateUrl: './case-selection.html',
  styleUrls: ['./styles.scss'],
})
export class CaseSelectionComponent implements OnInit {
  orgId: number;
  projectId: number;
  caseProjectId: number;

  @Input() selectFor: string;
  suiteId: number;
  runId: number;

  @Input() treeModel: any;
  @Input() treeSettings: any = {};
  @Input() brotherProjects: any[] = [];
  @Input() users: any[] = [];

  @Input() progress: string = '0';
  @Input() color: string = '#209e91';
  @Input() height: string = '1px';
  @Input() show: boolean = true;

  form: FormGroup;
  createUsers: any[] = [];
  updateUsers: any[] = [];
  _queryModel: any = { type: {}, priority: {}, createUsers: [], updateUsers: [] };
  queryModel: any;

  cases: string[];
  _disabledV: string = '0';
  disabled: boolean = false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private _treeService: ZtreeService,
              public _sutieService: SuiteService, public _caseService: CaseService ) {

    this.queryModel = _.cloneDeep(this._queryModel);
    this.queryModel.projectId

    this.orgId = CONSTANT.CURR_ORG_ID;
  }

  ngOnInit(): any {
    this.buildForm();

    this.loadData();
  }

  loadData() {
    if (this.selectFor == 'suite') {
      this._caseService.queryForSuiteSelection(this.projectId, this.caseProjectId, this.suiteId)
            .subscribe((json: any) => {
        this.treeModel = json.data;
        this.brotherProjects = json.brotherProjects;
      });
    } else if (this.selectFor == 'run') {
      this._caseService.queryForRunSelection(this.projectId, this.caseProjectId, this.runId)
            .subscribe((json: any) => {
        this.treeModel = json.data;
        this.brotherProjects = json.brotherProjects;
      });
    }
  }

  save(): any {
    const ztree = $.fn.zTree.getZTreeObj('tree');
    this.activeModal.close({ act: 'save', projectId: this.projectId, caseProjectId: this.caseProjectId,
      data: ztree.getCheckedNodes(true) });
  }

  reset() {
    console.log('reset');
  }

  dismiss(): any {
    this.activeModal.dismiss({ act: 'cancel' });
  }

  onModuleSelected(event: any) {
    console.log('onNodeSelected', event);
  }
  onCaseSelected(item: any) {
    console.log('onCaseSelected', item);
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        'type': ['', []],
        'priority': ['', []],
        'estimate': ['', []],
        'createTime': ['', []],
        'updateTime': ['', []],
        'createUser': ['', []],
        'updateUser': ['', []],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.query(data));
  }
  formErrors = [];
  validateMsg = {

  };

  query(data?: any) {
    const ztree = jQuery.fn.zTree.getZTreeObj('tree');
    if (!ztree) {
      return;
    }

    let nodes = ztree.getNodesByParam('isHidden', true);
    ztree.showNodes(nodes);

    const typeFilter: string[] = this.validFilter(this.queryModel.type);
    const priorityFilter: string[] = this.validFilter(this.queryModel.priority);
    const estimateFilter: string[] = this.queryModel.estimate ? this.queryModel.estimate.split('-') : [];

    const createTimeFilter: number = this.queryModel.createTime * 24 * 60 * 60 * 1000;
    const updateTimeFilter: number = this.queryModel.updateTime * 24 * 60 * 60 * 1000;

    const createByFilter: string[] = this.queryModel.createUsers.map(function (item, index, input) {
      return item.id;
    });
    const updateByFilter: string[] = this.queryModel.updateUsers.map(function (item, index, input) {
      return item.id;
    });

    nodes = ztree.getNodesByFilter((node) => {
      return !node.isParent && (
          ( typeFilter.length > 0 && _.indexOf(typeFilter, node.type) < 0 )
          || ( priorityFilter.length > 0 && _.indexOf(priorityFilter, node.priority) < 0 )
          || ( estimateFilter.length > 0 && (parseInt(node.estimate) < parseInt(estimateFilter[0]) || parseInt(node.estimate) > parseInt(estimateFilter[1])) )

          || ( createTimeFilter && (new Date().getTime() - node.createTime) > createTimeFilter )
          || ( updateTimeFilter && (new Date().getTime() - node.updateTime) > updateTimeFilter )

          || ( createByFilter.length > 0 && _.indexOf(createByFilter, node.createById) < 0 )
          || ( updateByFilter.length > 0 && _.indexOf(updateByFilter, node.updateById) < 0 )
        );
    });
    ztree.hideNodes(nodes);
  }

  resetFilters() {
    this.queryModel = _.cloneDeep(this._queryModel);
    this.createUsers = [];
    this.updateUsers = [];
    this.query();
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public refreshCreateBy(value: any): void {
    this.queryModel.createUsers = value;
    this.query();
  }
  public refreshUpdateBy(value: any): void {
    this.queryModel.updateUsers = value;
    this.query();
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

  public validFilter(obj: any): string[] {
    const arr: string[] = [];

    for (const i in obj) {
      if (obj[i]) {
        arr.push(i);
      }
    }
    return arr;
  }

  changeProject(id: number) {
    this.caseProjectId = id;
    this.loadData();
  }

}
