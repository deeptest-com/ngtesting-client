import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import * as _ from 'lodash';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { OrgRoleService } from '../../../../service/org-role';
import { PopDialogComponent } from '../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'org-role-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class OrgRoleEdit implements OnInit, AfterViewInit {
  id: number;
  tab: string = 'info';
  orgRole: any = { disabled: false };
  privileges: any[] = [];
  users: any[] = [];
  groups: any[] = [];

  form: any;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private orgRoleService: OrgRoleService) {

  }
  ngOnInit() {
    const that = this;

    that._route.params.forEach((params: Params) => {
      that.id = +params['id'];
    });

    that.loadData();
    that.buildForm();
  }
  ngAfterViewInit() {}

  loadData() {
    const that = this;
    that.orgRoleService.get(that.id).subscribe((json: any) => {
      that.orgRole = json.orgRole;
      that.privileges = json.privileges;
      that.users = json.users;
      this.groups = json.groups;

      _.forEach(that.privileges, (item: any, index: number) => {
        this.form.addControl('privilege-' + item.orgPrivilegeId, new FormControl('', []));
      });

      _.forEach(that.users, (item: any, index: number) => {
        this.form.addControl('user-' + item.userId, new FormControl('', []));
      });
      _.forEach(that.groups, (item: any, index: number) => {
        this.form.addControl('group-' + item.groupId, new FormControl('', []));
      });
    });
  }

  save() {
    const that = this;

    that.orgRoleService.save(that.orgRole, that.privileges, that.users, that.groups).subscribe((json: any) => {
      if (json.code == 1) {

        that.formErrors = ['保存成功'];
        that._routeService.navTo('/pages/org-admin/org-role/list');
      } else {
        that.formErrors = ['保存失败'];
      }
    });
  }

  delete() {
    const that = this;

    that.orgRoleService.delete(that.orgRole.id).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        that._routeService.navTo('/pages/org-admin/org-role/list');

        this.modalWrapper.closeModal();
      } else {
        that.formErrors = [json.msg];
      }
    });
  }

  select(key: string) {
    const val = key === 'all' ? true : false;
    for (const item of this.privileges) {
      item.selecting = val;
    }
  }
  tabChange(event: any) {
    this.tab = event.nextId;
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
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
    'name': {
      'required':      '名称不能为空',
    },
    'descr': {
    },
  };

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

