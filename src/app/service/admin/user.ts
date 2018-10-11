import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../request';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONSTANT } from '../../utils/constant';
import { GlobalState } from '../../global.state';
import { RouteService } from '../route';

@Injectable()
export class UserAdmin {
  constructor(private _state: GlobalState, private _routeService: RouteService, private _reqService: RequestService) { }
  private _apiBase = 'admin/user/';

  list(query: any, page: number, pageSize: number) {
    _.merge(query, { page: page, pageSize: pageSize });
    return this._reqService.post(this._apiBase + 'list', query);
  }

  invite(user: any, groups: any[]) {
    return this._reqService.post(this._apiBase + 'invite', { user: user, relations: groups });
  }
  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  update(user: any, groups: any[]) {
    return this._reqService.post(this._apiBase + 'update', { user: user, relations: groups });
  }
  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }
  removeFromOrg(userId: number, orgId: number) {
    const model = { userId: userId, orgId: orgId };
    return this._reqService.post(this._apiBase + 'removeFromOrg', model);
  }

}

