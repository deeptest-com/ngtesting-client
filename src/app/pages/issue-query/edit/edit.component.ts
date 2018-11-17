import { Component, ViewEncapsulation, NgModule, Pipe, Input, Compiler, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbDatepickerI18n, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { Utils, logger } from '../../../utils/utils';
import { ValidatorUtils, CustomValidator } from '../../../validator';
import { RouteService } from '../../../service/route';

import { IssueQueryService } from '../../../service/client/issue-query';
import { PopDialogComponent } from '../../../components/pop-dialog';

declare var jQuery;
import * as _ from 'lodash';

@Component({
  selector: 'issue-query-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueQueryEdit implements OnInit, AfterViewInit {
  id: number;
  model: any = {};

  form: FormGroup;

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private _route: ActivatedRoute, private fb: FormBuilder,private modalService: NgbModal,
              private _issueQueryService: IssueQueryService) {


  }
  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    this.loadData();

    this.buildForm();
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
      }, {},
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

    dateCompare: '结束时间必须大于或等于开始时间',
  };

  loadData() {
    const that = this;
    that._issueQueryService.get(this.id).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  update() {
    this._issueQueryService.update(this.model).subscribe((json: any) => {
      if (json.code == 1) {
        this.back();
      } else {
        this.formErrors = [json.msg];
      }
    });
  }

  back() {
    this._routeService.navTo('/pages/org/'
      + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue-query/list');
  }

}

