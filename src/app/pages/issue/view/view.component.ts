import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild }
  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../global.state';

import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

import { PrivilegeService } from '../../../service/privilege';
import { IssueService } from '../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'issue-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class IssueView implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueView';
  orgId: number;
  prjId: number;
  canEdit: boolean;

  projectId: number;
  id: number;
  model: any = {};

  settings: any;
  data: any;
  form: any;

  issuePropertyMap: any;
  fields: any[] = [];

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private toastyService: ToastyService,
              private _issueService: IssueService, private privilegeService: PrivilegeService) {
    this.issuePropertyMap = CONSTANT.CASE_PROPERTY_MAP;

    this.canEdit = this.privilegeService.hasPrivilege('issue-update');
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    // this.loadData();
  }
  ngOnInit() {
  }
  ngAfterViewInit() {}

  loadData() {
    this._issueService.get(this.id, 'view').subscribe((json: any) => {
      this.model = json.data;
    });
  }

  back() {
    const url = '/pages/org/' + this.orgId + '/prj/' + this.prjId + '/issue/query/' + CONSTANT.ISSUE_JQL;
    console.log(url);
    this._routeService.navTo(url);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
  }
}

