import { AfterViewInit, Compiler, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbDateParserFormatter, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomDatepickerI18n, I18n } from '../../../../service/datepicker-I18n';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { logger } from '../../../../utils/utils';
import { CustomValidator, ValidatorUtils } from '../../../../validator';
import { RouteService } from '../../../../service/route';

import { SuiteService } from '../../../../service/suite';
import { RunService } from '../../../../service/run';
import { CaseService } from '../../../../service/case';
import { UserService } from '../../../../service/user';

import { RunEditComponent } from '../../run/edit';
import { CaseSelectionComponent } from '../../../../components/case-selection';
import { EnvironmentConfigComponent } from '../../../../components/environment-config';
import { PopDialogComponent } from '../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'nga-suite-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss',
    '../../../../../assets/vendor/ztree/css/zTreeStyle/zTreeStyle.css',
    '../../../../components/ztree/src/styles.scss'],
  templateUrl: './edit.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class SuiteEditComponent implements OnInit, AfterViewInit {
  orgId: number;
  prjId: number;
  caseProjectId: number;

  treeSettings: any = { usage: 'selection', isExpanded: true, sonSign: false };

  suiteId: number;
  startDate: any;
  model: any = { };
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
              private _i18n: I18n, private modalService: NgbModal,
              private compiler: Compiler, private ngbDateParserFormatter: NgbDateParserFormatter,
              private _suiteService: SuiteService, private _runService: RunService,
              private _caseService: CaseService, private _userService: UserService) {


  }

  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.suiteId = +params['suiteId'];
    });

    if (this.suiteId) {
      this.loadData();
    }
    this.buildForm();

    const now = new Date();
    this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  }

  ngAfterViewInit() {
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
        'estimate': ['', []],
        'disabled': ['', []],
      }, {
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
    'objective': {
      'required': '测试目的不能为空',
    },
    'estimate': {
      'pattern': '耗时必须是最多含2位小数的数字',
    },
    dateCompare: '结束时间必须大于或等于开始时间',
  };

  loadData() {
    const that = this;
    that._suiteService.get(this.suiteId).subscribe((json: any) => {
      that.model = json.data;
      that.caseProjectId = that.model.caseProjectId;

      this.model.startTime = this.ngbDateParserFormatter.parse(that.model.startTime);
      this.model.endTime = this.ngbDateParserFormatter.parse(that.model.endTime);
    });
  }

  save() {
    this._suiteService.save(this.prjId, this.caseProjectId ? this.caseProjectId : this.prjId, this.model).subscribe((json: any) => {
      if (json.code == 1) {
        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID
          + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/suite/list');
      } else {
        this.formErrors = [json.msg];
      }
    });
  }

  reset() {
    this.loadData();
  }

  editSuiteCases(suite: any, index: number) {
    this.compiler.clearCacheFor(CaseSelectionComponent);
    this.caseSelectionModal = this.modalService.open(CaseSelectionComponent, { windowClass: 'pop-modal' });

    this.caseSelectionModal.componentInstance.selectFor = 'suite';
    this.caseSelectionModal.componentInstance.treeSettings = this.treeSettings;
    this.caseSelectionModal.componentInstance.projectId = this.prjId;
    this.caseSelectionModal.componentInstance.caseProjectId = this.caseProjectId ? this.caseProjectId : this.prjId;
    this.caseSelectionModal.componentInstance.suiteId = suite.id;

    this._userService.getUsers(CONSTANT.CURR_PRJ_ID).subscribe((json: any) => {
      this.caseSelectionModal.componentInstance.users = json.data;
    });

    this.caseSelectionModal.result.then((result) => {
      this.saveSuiteCases(result.projectId, result.caseProjectId, result.data, index);
    }, (reason) => {
      logger.log('reason', reason);
    });
  }

  saveSuiteCases(projectId: number, caseProjectId: number, cases: any[], index: number): void {
    // if (!this.model.id) {
      this._suiteService.save(projectId, caseProjectId, this.model).subscribe((json: any) => {
        if (json.code == 1) {
          this.suiteId = json.data.id;
          this.model.id = json.data.id;
          this.caseProjectId = caseProjectId;

          this._saveSuiteCases(projectId, caseProjectId, cases);
        } else {
          this.formErrors = [json.msg];
        }
      });
    // } else {
    //   this._saveSuiteCases(projectId, suiteId, cases);
    // }
  }

  _saveSuiteCases(projectId: number, caseProjectId: number, cases: any[]) {
    this._suiteService.saveSuiteCases(projectId, caseProjectId, this.suiteId, cases).subscribe((json: any) => {
      this.model = json.data;
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
    this._suiteService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalDelete.closeModal();

        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/'
          + CONSTANT.CURR_PRJ_ID + '/implement/suite/list');
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

}

