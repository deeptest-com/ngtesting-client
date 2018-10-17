import { Component, ViewEncapsulation, ViewChild, QueryList, Query } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT, VARI, Utils } from '../../../../../utils';
import { ValidatorUtils } from '../../../../../validator/validator.utils';
import { RouteService } from '../../../../../service/route';

import { PopDialogComponent } from '../../../../../components/pop-dialog';

import { ProjectService } from '../../../../../service/client/project';
import { UserAndGroupService } from '../../../../../service/client/userAndGroup';

declare var jQuery;

@Component({
  selector: 'project-edit-info',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./info.scss'],
  templateUrl: './info.html',
})
export class ProjectEditInfo implements OnInit, AfterViewInit {
  orgId: number;
  type: string;
  id: number;

  formInfo: FormGroup;
  formAdd: FormGroup;

  tab: string = 'info';

  groups: any[] = [];

  model: any = {};
  searchModel: any = {};

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private _projectService: ProjectService) {
    this.orgId = CONSTANT.CURR_ORG_ID;

    this._route.params.forEach(params => {
      this.id = +params['id'];
      this.type = params['type'];
    });
    this.loadData();

    this.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  buildForm(): void {
    const that = this;

    let parentValidate = [];
    if (this.type === 'project') {
      parentValidate = [Validators.required];
    }
    this.formInfo = this.fb.group(
      {
        'name': ['', [Validators.required]],
        'descr': ['', []],
        'parentId': ['', parentValidate],
        'disabled': ['', []],
      }, {},
    );

    this.formInfo.valueChanges.debounceTime(500).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.formAdd = this.fb.group(
      {
        'projectRole': ['', [Validators.required]],
      }, {},
    );

  }
  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.formInfo, that.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '姓名不能为空',
    },
  };

  loadData() {
    this._projectService.getInfo(this.id).subscribe((json: any) => {
      this.model = json.data ? json.data : { type: this.type, disabled: false };
      this.groups = json.groups;
      if (this.type === 'project' && VARI.currGroupId) {
        this.model.parentId = VARI.currGroupId;
      }
    });
  }

  save() {
    this._projectService.save(this.model).subscribe((json: any) => {
      if (json.code == 1) {
        if (this.model.type == 'group') {
          VARI.currGroupId = json.data.id;
        } else {
          VARI.currGroupId = json.data.parentId;
        }

        this.formErrors = ['保存成功'];
        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs');
      } else {
        this.formErrors = ['保存失败'];
      }
    });
  }

  delete() {
    this._projectService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.model = json.data;

        this.formErrors = ['删除成功'];
        this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs');

        this.modalWrapper.closeModal();
      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  gotoProjectList() {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs');
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

