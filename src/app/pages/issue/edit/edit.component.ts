import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { ValidatorUtils } from '../../../validator/validator.utils';

import { IssueService } from '../../../service/issue';

import { PrivilegeService } from '../../../service/privilege';

declare var jQuery;

@Component({
  selector: 'issue-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueEdit implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'AiTaskEdit';

  projectId: number;
  id: number;
  model: any = { aiTestEnv: '' };
  asrLangModelVos: any[] = [];
  aiAudioTypeVos: any[] = [];
  aiProductBranchVos: any[] = [];
  aiTestEnvVos: any[] = [];
  aiTestTypeVos: any[] = [];
  aiTestSetVos: any[] = [];

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
              private issueService: IssueService, private privilegeService: PrivilegeService) {

  }
  ngOnInit() {
    this.canEdit = this.privilegeService.hasPrivilege('issue-update');

    this.projectId = CONSTANT.CURR_PRJ_ID;
    this.user = CONSTANT.PROFILE;

    this.buildForm();

    this._state.subscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode, (data: any) => {
      const issue = data.node;

      if (!issue || issue.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      this.caseTypes = CONSTANT.CASE_TYPES_FOR_PROJECT;
      this.casePriorities = CONSTANT.CASE_PRIORITIES_FOR_PROJECT;
      this.fields = CONSTANT.CUSTOM_FIELD_FOR_PROJECT;

      if (issue) {
        this.id = issue.id;
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
        'testType': ['', [Validators.required]],
        'testEnv': ['', [Validators.required]],
        'testProductId': ['', []],
        'testConcurrent': ['', []],
        'productBranch': ['', []],
        'asrLangModel': ['', []],
        'audioType': ['', []],
        'fuse': ['', []],
        'regexInput': ['', []],
        'startIndex': ['', []],
        'numbToRun': ['', []],

        'testsetSrc': ['', []],
        'testDuration': ['', []],
        'testsetId': ['', []],
        'testsetName': ['', []],
        'testsetPath': ['', []],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);

    if (this.model.testType == 'asrLite') {
      this.model.productBranch = '';
      this.model.asrLangModel = 'comm';
    } else {
      this.model.asrLangModel = '';
    }

    if (this.model.testType == 'nlu-sent') {
      this.model.testsetId = '';
    } else {
      this.model.isFuse = '';
    }

  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
    'testProductId': {
      'required': '名称不能为空',
    },
    'testType': {
      'required': '测试类型不能为空',
    },
    'testEnv': {
      'required': '测试环境不能为空',
    },
    'productBranch': {
      'required': '产品分支不能为空',
    },
  };

  loadData() {
    this.issueService.get(this.id).subscribe((json: any) => {
      this.model = json.data;

      this.asrLangModelVos = json.asrLangModelVos;
      this.aiAudioTypeVos = json.aiAudioTypeVos;
      this.aiProductBranchVos = json.aiProductBranchVos;
      this.aiTestEnvVos = json.aiTestEnvVos;
      this.aiTestTypeVos = json.aiTestTypeVos;
      this.aiTestSetVos = json.aiTestSetVos;
    });
  }

  save() {
    this.issueService.save(this.projectId, this.model).subscribe((json: any) => {
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

  onCreateConfirm(event: any) {
    console.log('onCreateConfirm', event);
    event.confirm.resolve();
  }

  onEditorKeyup(event: any) {
    this.model.content = event;
  }

  review(pass: boolean) {
    if (!pass) {
      this._state.notifyDataChanged(CONSTANT.EVENT_COMMENTS_EDIT, { pass: pass, summary: '评审失败' });
    } else {
      this._state.notifyDataChanged(CONSTANT.EVENT_COMMENTS_SAVE, { pass: pass, summary: '评审通过' });
    }
  }
  back() {

  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
  }

}

