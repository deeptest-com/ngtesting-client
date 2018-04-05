import { Component, ViewEncapsulation, NgModule, Pipe, Input, Compiler, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbDatepickerI18n, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { I18n, CustomDatepickerI18n } from '../../../../service/datepicker-I18n';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils, logger } from '../../../../utils/utils';
import { ValidatorUtils, CustomValidator } from '../../../../validator';
import { RouteService } from '../../../../service/route';

import { PlanService } from '../../../../service/plan';
import { RunService } from '../../../../service/run';
import { CaseService } from '../../../../service/case';
import { UserService } from '../../../../service/user';

import { CaseSelectionComponent } from '../../../../components/case-selection';
import { EnvironmentConfigComponent } from '../../../../components/environment-config';
import { PopDialogComponent } from '../../../../components/pop-dialog';

import { RunEditComponent } from '../../run/edit';

declare var jQuery;
import * as _ from 'lodash';

@Component({
  selector: 'plan-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss',
    '../../../../../assets/vendor/ztree/css/zTreeStyle/zTreeStyle.css',
    '../../../../components/ztree/src/styles.scss'],
  templateUrl: './edit.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class PlanEdit implements OnInit, AfterViewInit {
  orgId: number;
  prjId: number;

  treeSettings: any = { usage: 'selection', isExpanded: true, sonSign: false };

  planId: number;
  startDate: any;
  model: any = { runVos: [] };
  vers: any = [];
  envs: any = [];

  suites: any[] = [];
  run: any = {};
  runIndex: number;
  form: FormGroup;

  @ViewChild('modalSelectCase') modalSelectCase: CaseSelectionComponent;

  @ViewChild('modalDelete') modalDelete: PopDialogComponent;
  @ViewChild('modalConfigEnvi') modalConfigEnvi: PopDialogComponent;
  @ViewChild('modalRemoveSet') modalRemoveSet: PopDialogComponent;
  testSet: any;
  modalTitle: string;

  runEditModal: any;
  caseSelectionModal: any;
  envSelectionModal: any;

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private _route: ActivatedRoute, private fb: FormBuilder,
              private _i18n: I18n, private modalService: NgbModal, private compiler: Compiler,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private _planService: PlanService, private _runService: RunService,
              private _caseService: CaseService, private _userService: UserService) {

  }
  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.planId = +params['planId'];
    });

    this.loadData();

    this.buildForm();

    const now = new Date();
    this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
        'estimate': ['', []],
        'startTime': ['', []],
        'verId': ['', [Validators.required]],
        'endTime': ['', []],
        'disabled': ['', []],
      }, {
        validator: CustomValidator.compareDate('dateCompare', 'startTime', 'endTime'),
      },
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, ['dateCompare']);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
    'verId': {
      'required': '项目版本不能为空',
    },

    dateCompare: '结束时间必须大于或等于开始时间',
  };

  loadData() {
    const that = this;
    that._planService.get(CONSTANT.CURR_PRJ_ID, this.planId).subscribe((json: any) => {
      that.model = json.data;
      that.suites = json.suites;
      that.vers = json.vers;
      that.envs = json.envs;

      this.model.startTime = this.ngbDateParserFormatter.parse(that.model.startTime);
      this.model.endTime = this.ngbDateParserFormatter.parse(that.model.endTime);
    });
  }

  save() {
    this._planService.save(CONSTANT.CURR_PRJ_ID, this.model).subscribe((json: any) => {
      if (json.code == 1) {
        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/'
          + CONSTANT.CURR_PRJ_ID + '/implement/plan/list');
      } else {
        this.formErrors = [json.msg];
      }
    });
  }

  reset() {
    this.loadData();
  }

  editRun(run?: any, index?: number) {
    this.compiler.clearCacheFor(RunEditComponent);
    this.runEditModal = this.modalService.open(RunEditComponent, { windowClass: 'pop-modal' });

    if (!run) {
      this.run = { assignees: [] };
      this.runIndex = this.model.runVos.length;
    } else {
      this.run = run;
      this.runIndex = index;
    }
    this.runEditModal.componentInstance.selectedModels = this.run.assignees;
    this.runEditModal.componentInstance.model = this.run;
    this.runEditModal.componentInstance.suites = this.suites;
    this.runEditModal.componentInstance.envs = this.envs;

    this.runEditModal.result.then((result) => {
      this.model.userIds = result.data.userIds;
      this.saveRun();
    }, (reason) => {
      logger.log('reason', reason);
    });

  }
  saveRun() {
    if (!this.model.id) {
      this._planService.save(CONSTANT.CURR_PRJ_ID, this.model).subscribe((json: any) => {
        if (json.code == 1) {
          this.planId = json.data.id;
          this.model.id = json.data.id;

          this._saveRun();
        } else {
          this.formErrors = [json.msg];
        }
      });
    } else {
      this._saveRun();
    }
  }
  _saveRun() {
    this._runService.saveRun(CONSTANT.CURR_PRJ_ID, this.planId, this.run, this.suites).subscribe((json: any) => {
      this.model.runVos[this.runIndex] = json.data;
    });
  }

  editRunCases(run: any, index: number) {
    this.compiler.clearCacheFor(CaseSelectionComponent);
    this.caseSelectionModal = this.modalService.open(CaseSelectionComponent, { windowClass: 'pop-modal' });
    this.caseSelectionModal.componentInstance.treeSettings = this.treeSettings;

    this._caseService.queryForRunSelection(CONSTANT.CURR_PRJ_ID, run.id).subscribe((json: any) => {
      this.caseSelectionModal.componentInstance.treeModel = json.data;
    });
    this._userService.getUsers(CONSTANT.CURR_PRJ_ID).subscribe((json: any) => {
      this.caseSelectionModal.componentInstance.users = json.data;
    });

    this.caseSelectionModal.result.then((result) => {
      const id = run ? run.id : undefined;
      this.saveRunCases(id, result.data, index);
    }, (reason) => {
      logger.log('reason', reason);
    });
  }
  saveRunCases(runId: any, cases: any[], index: number): void {
    this._runService.saveRunCases(this.planId, runId, cases).subscribe((json: any) => {
      logger.log(json);
      this.model.runVos[index] = json.data;
    });
  }

  editEnvi(testSet: any): void {
    this.compiler.clearCacheFor(EnvironmentConfigComponent);
    this.envSelectionModal = this.modalService.open(EnvironmentConfigComponent, { windowClass: 'pop-modal' });
    this.envSelectionModal.result.then((result) => {
      logger.log('result', result);
    }, (reason) => {
      logger.log('reason', reason);
    });
    this.envSelectionModal.componentInstance.testSet = testSet;
  }

  delete(): void {
    this.modalTitle = '确认删除';
    this.modalDelete.showModal();
  }
  deleteConfirm() {
    this._planService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalDelete.closeModal();

        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/'
          + CONSTANT.CURR_PRJ_ID + '/implement/plan/list');
      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  removeSet(testSet: any): void {
    this.modalTitle = '确认删除';
    this.testSet = testSet;
    this.modalRemoveSet.showModal();
  }
  removeSetConfirm() {
    this._runService.delete(this.testSet.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalRemoveSet.closeModal();

        this.model.runVos = this.model.runVos.filter((item: any) => {
          return item.id != this.testSet.id;
          });

      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  endTimeChanged() {
    console.log('===', this.model);
  }

}

