import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from './request';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONSTANT } from '../utils/constant';
import { GlobalState } from '../global.state';
import { RouteService } from './route';

@Injectable()
export class UserService {
  constructor(private _state: GlobalState, private _routeService: RouteService, private _reqService: RequestService) { }
  _api_url = 'user/';

  list(query: any, page: number, pageSize: number) {
    _.merge(query, { page: page, pageSize: pageSize });
    return this._reqService.post(this._api_url + 'list', query);
  }

  listLastest() {
    return this._reqService.post(this._api_url + 'listLastest', {});
  }

  getUsers(projectId: number) {
    const model = { projectId: projectId };
    return this._reqService.post(this._api_url + 'getUsers', model);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  update(user: any, groups: any[]) {
    return this._reqService.post(this._api_url + 'update', { user: user, relations: groups });
  }
  invite(user: any, groups: any[]) {
    return this._reqService.post(this._api_url + 'invite', { user: user, relations: groups });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'delete', model);
  }
  removeFromOrg(userId: number, orgId: number) {
    const model = { userId: userId, orgId: orgId };
    return this._reqService.post(this._api_url + 'removeFromOrg', model);
  }

  search(keywords: string, exceptIds: any[]) {
    const model = { keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._api_url + 'search', model);
  }

}

