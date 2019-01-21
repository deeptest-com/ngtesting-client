import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../../global.state';
import { WS_CONSTANT } from '../../../../utils/ws-constant';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';

import { CaseService } from '../../../../service/client/case';
import { CaseAttachmentService } from '../../../../service/client/case-attachment';
import { CaseStepService } from '../../../../service/client/case-step';

import { PrivilegeService } from '../../../../service/privilege';
import { ZtreeService } from '../../../../components/ztree';

declare var jQuery;

@Component({
  selector: 'case-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss', '../../../../components/comments/comment-edit/src/styles.scss'],
  templateUrl: './edit.html',
})
export class CaseEdit implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'CaseEdit';

  projectId: number;
  id: number;
  model: any = {};
  isModule: true;

  settings: any;
  data: any;
  form: any;
  next: boolean = true;
  tab: string = 'content';

  casePropMap: any = {};
  casePropValMap: any = {};
  customFields: any[] = [];
  user: any;

  canEdit: boolean;

  constructor(private _state: GlobalState, private fb: FormBuilder, private toastyService: ToastyService,
              private _ztreeService: ZtreeService,
              private _caseService: CaseService, private _caseAttachmentService: CaseAttachmentService,
              private _caseStepService: CaseStepService, private privilegeService: PrivilegeService) {

    this.casePropMap = CONSTANT.CASE_PROPERTY_MAP;
    this.casePropValMap = CONSTANT.CASE_PROPERTY_VAL_MAP;
    this.customFields = CONSTANT.CASE_CUSTOM_FIELDS;

    this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);

      this.canEdit = this.privilegeService.hasPrivilege('test_case-maintain');
    });

  }
  ngOnInit() {
    this.canEdit = this.privilegeService.hasPrivilege('test_case-maintain');

    this.projectId = CONSTANT.CURR_PRJ_ID;
    this.user = CONSTANT.PROFILE;

    this.buildForm();

    this._state.subscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode, (data: any) => {
      console.log(CONSTANT.EVENT_CASE_EDIT, data);

      this.projectId = CONSTANT.CURR_PRJ_ID;
      const testCase = data.node;

      if (!testCase || testCase.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      if (testCase) {
        this.id = testCase.id;
        this.loadData();
      } else {
        this.model = null;
      }
    });

    this.settings = {
      canEdit: this.canEdit,
      columns: {
        ordr: {
          title: '顺序',
        },
        opt: {
          title: '操作',
          editor: {
            type: 'textarea',
          },
        },
        expect: {
          title: '期望结果',
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'type': ['', [Validators.required]],
        'priority': ['', [Validators.required]],
        'estimate': ['', []],
        'objective': ['', []],
        'pre_condition': ['', []],
        'next': ['', []],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '标题不能为空',
    },
    'type': {
      'required': '类别不能为空',
    },
    'priority': {
      'required': '优先级不能为空',
    },
  };

  loadData() {
    this._caseService.get(this.id).subscribe((json: any) => {
      this.model = json.data;
    });
  }

  update() {
    this._caseService.update(this.model).subscribe((json: any) => {
      if (json.code == 1) {
        this.model = json.data;
        this._state.notifyDataChanged(CONSTANT.EVENT_CASE_UPDATE, { node: this.model, random: Math.random() });

        const toastOptions: ToastOptions = {
          title: '保存成功',
          timeout: 2000,
        };
        this.toastyService.success(toastOptions);
      }
    });
  }

  tabChange(event: any) {
    this.tab = event.nextId;
  }
  changeContentType(contentType: string) {
    this._caseService.changeContentType(contentType, this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.model.contentType = contentType;
      }
    });
  }

  onCreateConfirm(event: any) {
    console.log('onCreateConfirm', event);
    event.confirm.resolve();
  }
  onSaveConfirm(event: any) {
    console.log('onSaveConfirm', event);
    this._caseStepService.save(this.id, event.newData).subscribe((json: any) => {
      event.confirm.resolve(json.data);
    });
  }
  onDeleteConfirm(event: any) {
    console.log('onDeleteConfirm', event);
    this._caseStepService.delete(event.data.id).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }

  onUpConfirm(event: any) {
    console.log('onUpConfirm', event);
    this._caseStepService.up(event.data.id, event.data.ordr).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }

  onDownConfirm(event: any) {
    console.log('onDownConfirm', event);
    this._caseStepService.down(event.data.id, event.data.ordr).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }

  onChange(event: any) {
    console.log('onChange', event);
    this.model.content = event;
  }

  uploadedEvent(event: any) {
    this._caseAttachmentService.uploadAttachment(this.model.id, event.data.name, event.data.path)
        .subscribe((json: any) => {
      this.model.attachments = json.attachments;
      this.model.histories = json.histories;
      event.deferred.resolve();
    });
  }
  removeAttachment(item: any) {
    this._caseAttachmentService.removeAttachment(this.model.id, item.id).subscribe((json: any) => {
      this.model.attachments = json.attachments;
      this.model.histories = json.histories;
    });
  }

  reviewResult(result: boolean) {
    let next;
    if (this.next) {
      next = this._ztreeService.getNextNode(this.model.id);
    }

    console.log('====');

    this._caseService.reviewResult(this.model.id, result, next ? next.id : null)
        .subscribe((json: any) => {
      if (json.code == 1) {
        this.model.reviewResult = result;

        this._ztreeService.selectNode(next);
        this._state.notifyDataChanged(CONSTANT.EVENT_CASE_UPDATE, { node: this.model, random: Math.random() });

        this.model = json.data;
      }
    });
  }

  exportAll() {
    this._caseService.exportAll().subscribe((json: any) => {
      Utils.download(json.excelPath);
    });
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}

