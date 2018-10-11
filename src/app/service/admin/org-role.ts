import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GlobalState } from '../../global.state';

import { CONSTANT } from '../../utils/constant';
import { RouteService } from '../route';
import { RequestService } from '../request';

@Injectable()
export class OrgRoleService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/org_role/';

  list(query: any) {
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(orgRole: any, privileges: any[], users: any[], groups: any[]) {
    return this._reqService.post(this._apiBase + 'save',
      { orgRole: orgRole, privileges: privileges, users: users, groups: groups } );
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }
}
