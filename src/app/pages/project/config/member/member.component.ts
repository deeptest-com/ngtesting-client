import { Component, ViewEncapsulation, ViewChild, QueryList, Query } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { GlobalState } from '../../../../global.state';

import { CONSTANT, VARI, Utils } from '../../../../utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { PopDialogComponent } from '../../../../components/pop-dialog';

import { ProjectMemberService } from '../../../../service/client/project-member';
import { UserAndGroupService } from '../../../../service/client/userAndGroup';

declare var jQuery;

@Component({
  selector: 'project-edit-member',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./member.scss'],
  templateUrl: './member.html',
})
export class ProjectEditMember implements OnInit, AfterViewInit {
  orgId: number;
  projectId: number;

  formInfo: FormGroup;
  formAdd: FormGroup;

  groups: any[] = [];
  projectRoles: any[] = [];

  entityInRoles: any[] = [];
  entitySearchResult: any[];

  selectedModels: any[] = [];
  modelAdd: any = { };
  searchModel: any = {};

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private _projectMemberService: ProjectMemberService,
              private _userAndGroupService: UserAndGroupService) {
    this.orgId = CONSTANT.CURR_ORG_ID;

    this._route.pathFromRoot[6].params.forEach(params => {
        this.projectId = +params['id'];
    });
    console.log('projectId', this.projectId);

    this.loadData();

    this.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.formAdd = this.fb.group(
      {
        'projectRole': ['', [Validators.required]],
      }, {},
    );
  }

  loadData() {
    this._projectMemberService.getUsers(this.projectId).subscribe((json: any) => {
      this.projectRoles = json.projectRoles;
      this.entityInRoles = json.entityInRoles;
    });
  }

  add($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.modelAdd.projectId = this.projectId;

    const entityTypeAndIds: string[] = [];
    this.selectedModels.forEach(item => { entityTypeAndIds.push(item.type + ',' + item.id); });

    this._projectMemberService.saveMembers(this.modelAdd, entityTypeAndIds).subscribe((json: any) => {
      if (json.code == 1) {
        this.searchModel = {};
        this.modelAdd = { roleId: this.modelAdd.roleId };
        this.selectedModels = [];
        this.entityInRoles = json.entityInRoles;
      }
    });
  }

  changeSearch(searchModel: any): void {
    const userIds = [];
    this.selectedModels.forEach(item => {
      if (item.type == 'user') {
        userIds.push(item.id);
      }
    });

    const groupIds = [];
    this.selectedModels.forEach(item => {
      if (item.type == 'group') {
        groupIds.push(item.id);
      }
    });

    this._userAndGroupService.search(searchModel.keywords, userIds, groupIds).subscribe((json: any) => {
      if (json.data.length == 0) {
        this.entitySearchResult = null;
      } else {
        this.entitySearchResult = json.data;
      }
    });
  }

  changeRole(roleId: number, entityId: number) {
    this._projectMemberService.changeRole(this.projectId, roleId, entityId).subscribe((json: any) => {
      if (json.code == 1) {
        this.entityInRoles = json.entityInRoles;
      }
    });
  }

  remove(item) {
    this._projectMemberService.remove(this.projectId, item).subscribe((json: any) => {
      if (json.code == 1) {
        this.entityInRoles = json.entityInRoles;
      }
    });
  }

}

