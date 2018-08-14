import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../../global.state';
import { WS_CONSTANT } from '../../../../utils/ws-constant';
import { CONSTANT } from '../../../../utils/constant';
import { ValidatorUtils } from '../../../../validator/validator.utils';

import { CaseService } from '../../../../service/case';
import { CaseAttachmentService } from '../../../../service/case-attachment';
import { CaseStepService } from '../../../../service/case-step';

import { PrivilegeService } from '../../../../service/privilege';

declare var jQuery;

@Component({
  selector: 'case-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss', '../../../../components/case-comments/comment-edit/src/styles.scss'],
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
  tab: string = 'content';

  caseTypes: any[] = [];
  casePriorities: any[] = [];
  fields: any[] = [];
  user: any;

  canEdit: boolean;

  constructor(private _state: GlobalState, private fb: FormBuilder, private toastyService: ToastyService,
              private _caseService: CaseService, private _caseAttachmentService: CaseAttachmentService,
              private _caseStepService: CaseStepService, private privilegeService: PrivilegeService) {

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
      this.projectId = CONSTANT.CURR_PRJ_ID;
      const testCase = data.node;

      if (!testCase || testCase.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      this.caseTypes = CONSTANT.CASE_TYPES_FOR_PROJECT;
      this.casePriorities = CONSTANT.CASE_PRIORITIES_FOR_PROJECT;
      this.fields = CONSTANT.CUSTOM_FIELD_FOR_PROJECT;

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
    if (!result) {
      this._state.notifyDataChanged(CONSTANT.EVENT_COMMENTS_EDIT, { result: result, summary: '评审失败' });
    } else {
      this._state.notifyDataChanged(CONSTANT.EVENT_COMMENTS_SAVE, { result: result, summary: '评审通过' });
    }
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}

