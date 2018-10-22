import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssueResolutionService } from '../../../../../service/admin/issue-resolution';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-resolution-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueResolutionEdit implements OnInit, AfterViewInit {

  id: number;

  model: any = {};
  form: FormGroup;
  isSubmitted: boolean;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueResolutionService: IssueResolutionService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
    this.buildForm();
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'label': ['', [Validators.required]],
        'value': ['', [Validators.required]],
        'descr': ['', []],
        'disabled': ['', []],
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
    'label': {
      'required': '名称不能为空',
    },
  };

  loadData() {
    const that = this;
    that.issueResolutionService.get(that.id).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  save() {
    const that = this;

    that.issueResolutionService.save(that.model).subscribe((json: any) => {
      if (json.code == 1) {
        CONSTANT.CASE_PROPERTY_MAP = json.issuePropertyMap;

        that.formErrors = ['保存成功'];
        this.back();
      } else {
        that.formErrors = [json.msg];
      }
    });
  }
  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-resolution/list');
  }

  delete() {
    const that = this;

    that.issueResolutionService.delete(that.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

