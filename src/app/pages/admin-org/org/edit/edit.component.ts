import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../validator';
import { RouteService } from '../../../../service/route';

import { PopDialogComponent } from '../../../../components/pop-dialog';

import { OrgService } from '../../../../service/org';

declare var jQuery;

@Component({
  selector: 'org-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class OrgEdit implements OnInit, AfterViewInit {
  id: number;
  profile: any = {};

  model: any = { disabled: false };
  groups: any[] = [];
  form: FormGroup;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private orgService: OrgService) {

  }
  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    if (this.id) {
      this.loadData();
    }

    this.buildForm();
  }
  ngAfterViewInit() {
    this.profile = CONSTANT.PROFILE;
  }

  buildForm(): void {
    const that = this;
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'website': ['', []],
        'disabled': ['', []],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '姓名不能为空',
    },
  };

  loadData() {
    const that = this;
    that.orgService.get(that.id).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  save() {
    const that = this;

    that.orgService.save(that.model).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['保存成功'];
        that._routeService.navTo('/pages/org-admin/org/list');
      } else {
        that.formErrors = ['保存失败'];
      }
    });
  }

  delete() {
    const that = this;

    that.orgService.delete(that.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        that._routeService.navTo('/pages/org-admin/org/list');
      } else {
        that.formErrors = [json.msg];
      }
      this.modalWrapper.closeModal();
    });
  }

  showModal(): void {
    if (this.model.defaultOrg) {
      this.formErrors = ['无法删除当前活动的组织'];
    } else {
      this.modalWrapper.showModal();
    }
  }

}

