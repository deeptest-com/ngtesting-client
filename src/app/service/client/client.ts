import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../request';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONSTANT } from '../../utils/constant';
import { GlobalState } from '../../global.state';
import { RouteService } from './../route';

@Injectable()
export class ClientService {
  constructor(private _state: GlobalState, private _routeService: RouteService, private _reqService: RequestService) { }
  _apiBase = 'client/client/';

  _getProfile = this._apiBase + 'getProfile';
  _saveInfo = this._apiBase + 'saveInfo';
  _setLeftSize = this._apiBase + 'setLeftSize';
  _setIssueView = this._apiBase + 'setIssueView';

  loadProfileRemote(context = {}): Observable<any> {
    const that = this;
    const token = Cookie.get(CONSTANT.TOKEN_KEY);
    console.log('token from cookie: ', token);

    if (token && token != 'undefined') {
      CONSTANT.TOKEN = JSON.parse(token);

      return this._reqService.post(that._getProfile, context).map(json => {
        if (json.code == 1) {
          // 个人层面
          CONSTANT.SYS_PRIVILEGES = json.sysPrivileges;
          CONSTANT.MY_ORGS = json.myOrgs;
          CONSTANT.RECENT_QUERIES = json.recentQueries;

          CONSTANT.PROFILE = json.profile;
          CONSTANT.CURR_ORG_ID = json.profile.defaultOrgId;
          CONSTANT.CURR_ORG_NAME = json.profile.defaultOrgName;
          CONSTANT.CURR_PRJ_ID = json.profile.defaultPrjId;
          CONSTANT.CURR_PRJ_NAME = json.profile.defaultPrjName;

          // 组织层面
          CONSTANT.ORG_PRIVILEGES = json.orgPrivileges;
          CONSTANT.RECENT_PROJECTS = json.recentProjects;

          // 更多项目级需要初始化的东西，在PrjResolve中初始化

          return Observable.of(true);
        } else {
          this._routeService.navTo('/login');
          return Observable.of(false);
        }
      });
    } else {
      this._routeService.navTo('/login');
      return Observable.of(false);
    }
  }

  saveInfo(profile: any) {
    return this._reqService.post(this._saveInfo, profile);
  }

  setLeftSize(left: number, prop: string) {
    const model = { left: left, prop: prop };
    return this._reqService.post(this._setLeftSize, model);
  }

  setIssueView(issueView: string) {
    const model = { issueView: issueView };
    return this._reqService.post(this._setIssueView, model);
  }

}

