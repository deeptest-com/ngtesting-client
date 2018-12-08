import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../global.state';
import { WS_CONSTANT } from '../../../../utils/ws-constant';

import { CONSTANT } from '../../../../utils/constant';
import { Utils, logger } from '../../../../utils/utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { CaseService } from '../../../../service/client/case';
import { CaseStepService } from '../../../../service/client/case-step';
import { CaseInTaskService } from '../../../../service/client/case-in-task';
import { CaseAttachmentService } from '../../../../service/client/case-attachment';
import { ZtreeService } from '../../../../components/ztree';
import { PrivilegeService } from '../../../../service/privilege';

declare var jQuery;

@Component({
  selector: 'execution-result',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./result.scss', '../../../../components/case-comments/comment-edit/src/styles.scss'],
  templateUrl: './result.html',
})
export class ExecutionResult implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'ExecutionResult';

  planId: number;
  taskId: number;

  id: number;
  model: any = {};
  settings: any;
  data: any;
  form: any;
  tab: string = 'info';

  casePropMap: any = {};
  casePropValMap: any = {};
  customFields: any[] = [];

  next: boolean = true;

  user: any;
  canEdit: boolean;
  canExe: boolean;

  @Input() act: string;

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private _route: ActivatedRoute, private fb: FormBuilder,
              private _caseService: CaseService, private _caseStepService: CaseStepService,
              private _caseInTaskService: CaseInTaskService, private _caseAttachmentService: CaseAttachmentService,
              private _ztreeService: ZtreeService, private privilegeService: PrivilegeService) {

    this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);

      this.updatePriv();
    });

    this.buildForm();
  }
  ngOnInit() {
    this.user = CONSTANT.PROFILE;

    this.updatePriv();

    this._route.params.forEach((params: Params) => {
      this.planId = +params['planId'];
      this.taskId = +params['taskId'];
    });

    this._state.subscribe(CONSTANT.EVENT_CASE_EXE, this.eventCode, (data: any) => {
      logger.log(CONSTANT.EVENT_CASE_EXE, data);
      const testCase = data.node;
      if (!testCase || testCase.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      this.casePropMap = CONSTANT.CASE_PROPERTY_MAP;
      this.customFields = CONSTANT.CASE_CUSTOM_FIELDS;

      if (testCase) {
        this.id = testCase.entityId;

        this.loadData();
      } else {
        this.model = undefined;
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
        'result': ['', []],
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
  };

  loadData() {
    const that = this;
    that._caseInTaskService.get(that.id).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  setResult(status: string) {
    let next;
    if (this.next) {
      next = this._ztreeService.getNextNode(this.model.id);
    }

    this._caseInTaskService.setResult(this.model.entityId, this.model.id, this.model.result,
      next ? next.entityId : null, status)
        .subscribe((json: any) => {
      if (json.code == 1) {
        this.model.status = status;
        this._ztreeService.selectNode(next);

        this._state.notifyDataChanged(CONSTANT.EVENT_CASE_UPDATE, { node: this.model, random: Math.random() });
        this.model = json.data;
      }
    });
  }

  reset() {
    this.loadData();
  }

  saveField (event: any) {
    this._caseService.saveField(this.model.id, event.data).subscribe((json: any) => {
      if (json.code == 1) {
        // this.model = json.data;
        this._state.notifyDataChanged(CONSTANT.EVENT_CASE_UPDATE, { node: this.model, random: Math.random() });
        event.deferred.resolve();
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

  onUpConfirm(event: any) {
    logger.log('onUpConfirm', event);
    this._caseStepService.up(event.data.id, event.data.ordr).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }

  onDownConfirm(event: any) {
    logger.log('onDownConfirm', event);
    this._caseStepService.down(event.data.id, event.data.ordr).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }

  onCreateConfirm(event: any) {
    logger.log('onCreateConfirm', event);
    event.confirm.resolve();
  }
  onSaveConfirm(event: any) {
    logger.log('onSaveConfirm', event);
    this._caseStepService.save(this.model.id, event.newData).subscribe((json: any) => {
      event.confirm.resolve();
    });
  }
  onDeleteConfirm(event: any) {
    logger.log('onDeleteConfirm', event);
    this._caseStepService.delete(event.data).subscribe((json: any) => {
      event.confirm.resolve();
    });
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
      this.model.attachments = json.data;
    });
  }

  updatePriv() {
    this.canEdit = this.act != 'view' && this.privilegeService.hasPrivilege('test_case-maintain');
    this.canExe = this.act != 'view' && this.privilegeService.hasPrivilege('test_task-exe');
  }

  returnTo() {
    const url: string = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
      + '/implement/plan/' + this.planId + '/view';
    logger.log(url);
    this._routeService.navTo(url);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EXE, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}

