import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';

import { RouteService } from '../../../service/route';

import { OrgService } from '../../../service/org';
import { AccountService } from '../../../service/account';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'BaPageTop';

  environment: any;

  orgId: number;
  prjId: number;

  profile: any = {};
  project: any = {};
  projects: any[] = [];

  orgs: any[] = [];
  keywords: string;

  msgs: any[] = [];
  alerts: any[] = [];

  public isScrolled: boolean = false;

  constructor(private _router: Router,
              private _state: GlobalState, private _routeService: RouteService,
              private orgService: OrgService, private accountService: AccountService) {

    this.environment = environment;

    this._state.subscribe(WS_CONSTANT.WS_MSG_AND_ALERT_LASTEST, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_MSG_AND_ALERT_LASTEST + ' in ' + this.eventCode, json);
      this.alerts = json.alerts;
      this.msgs = json.msgs;
    });

    this._state.subscribe(WS_CONSTANT.WS_USER_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_USER_SETTINGS + ' in ' + this.eventCode, json);

      this.profile = json.profile;
    });

    this._state.subscribe(WS_CONSTANT.WS_MY_ORGS, this.eventCode, (json: any) => {
      console.log(WS_CONSTANT.WS_MY_ORGS + ' in ' + this.eventCode, json);

      this.orgs = json.myOrgs;
    });

    this._state.subscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_ORG_SETTINGS + ' in ' + this.eventCode, json);

      CONSTANT.CURR_ORG_NAME = json.org.name;
      CONSTANT.ORG_PRIVILEGES = json.orgPrivileges;
    });

    this._state.subscribe(WS_CONSTANT.WS_RECENT_PROJECTS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_RECENT_PROJECTS + ' in ' + this.eventCode, json);

      CONSTANT.CURR_ORG_ID = json.defaultOrgId;
      CONSTANT.CURR_PRJ_ID = json.defaultPrjId;

      this.orgId = json.defaultOrgId;
      this.prjId = json.defaultPrjId;

      this.projects = json.recentProjects;

    });

    this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);

      CONSTANT.PRJ_PRIVILEGES = json.prjPrivileges;
    });

  }

  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this.profile = CONSTANT.PROFILE;
    this.orgs = CONSTANT.MY_ORGS;
    this.projects = CONSTANT.RECENT_PROJECTS;
  }
  ngAfterViewInit() {}

  public changeOrg(org: any) {
    this._routeService.navTo('/pages/org/' + org.id + '/prjs');
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  gotoModule(module: string) {
    let url = '';
    if (module == 'design') {
      url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/design/case';
    } else if (module == 'suite') {
      url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/suite/list';
    } else if (module == 'implement') {
      url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/plan/list';
    } else if (module == 'autotest') {
      url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/autotest/aitask';
    } else if (module == 'issue') {
      url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/query/0/all';
    }

    this._routeService.navTo(url);
  }

  logout() {
    this.accountService.logout();

    this._routeService.navTo('/pages/login');
  }

  onSearchKeywordChanged(e: any) {
    if (this._router.url.indexOf('design/case') < 0) {
      this._routeService.quickJump(this.keywords);
    } else {
      this._state.notifyDataChanged(CONSTANT.EVENT_CASE_JUMP, this._routeService.caseIdForJump(this.keywords));
    }
  }

  selectProject(prjId: number) {
    if (this._router.url.indexOf('/prj/') > -1) {
      // Suite、Plan、Issue回到模块的首页
      if (this._router.url.indexOf('/implement/suite') > -1) {
        this._routeService.navTo('/pages/org/' + this.orgId + '/prj/' + prjId + '/implement/suite/list');
      } else if (this._router.url.indexOf('/implement/plan') > -1) {
        this._routeService.navTo('/pages/org/' + this.orgId + '/prj/' + prjId + '/implement/plan/list');
      } else if (this._router.url.indexOf('/issue/query') > -1) {
        this._routeService.navTo('/pages/org/' + this.orgId + '/prj/' + prjId + '/issue/query/0/all');
      } else {
        const arr = this._router.url.split('/prj/');
        const url = arr[0] + '/prj/' + prjId + arr[1].substr(arr[1].indexOf('/'), arr[1].length);
        this._routeService.navTo(url);
      }
    } else { // 回到项目View页
      this._routeService.navTo('/pages/org/' + this.orgId + '/prj/' + prjId + '/view');
    }
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_MSG_AND_ALERT_LASTEST, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_USER_SETTINGS, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_MY_ORGS, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_RECENT_PROJECTS, this.eventCode);
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}
