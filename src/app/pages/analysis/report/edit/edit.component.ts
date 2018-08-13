import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { CaseService } from '../../../../service/case';
import { CaseStepService } from '../../../../service/case-step';

declare var jQuery;

@Component({
  selector: 'report-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class ReportEdit implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'ReportEdit';

  reportId: number;
  model: any;
  form: any;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute, private fb: FormBuilder,
              private _caseService: CaseService, private _caseStepService: CaseStepService) {

  }
  ngOnInit() {
    const that = this;

    that._route.params.forEach((params: Params) => {
      that.reportId = +params['reportId'];
    });

    if (that.reportId) {
      that.loadData();
    }
    that.buildForm();

    // this._state.subscribe(CONSTANT.EVENT_CASE_CHANGE, this.eventCode, (data) => {
    //   const testCase = data.node;
    //   that.reportId = testCase.id;
    //   that.loadData();
    // });
  }
  ngAfterViewInit() {}

  buildForm(): void {
    const that = this;
    this.form = this.fb.group(
      {
        'title': ['', [Validators.required]],
        'objective': ['', [Validators.required]],
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
    'title': {
      'required':      '简介不能为空',
    },
    'objective': {
      'required':      '描述不能为空',
    },
  };

  loadData() {
    // that._caseService.get(that.reportId).subscribe((json:any) => {
    //   that.model = json.data;
    // });
  }

  save() {
    // that._caseService.save(that.model).subscribe((json:any) => {
    //   if (json.code == 1) {
    //     that.model = json.data;
    //   }
    // });
  }

  reset() {
    this.loadData();
  }

  ngOnDestroy(): void {

  }

}

