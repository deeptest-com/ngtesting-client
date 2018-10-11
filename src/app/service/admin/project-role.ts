import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GlobalState } from '../../global.state';

import { CONSTANT } from '../../utils/constant';
import { RouteService } from '../route';
import { RequestService } from '../request';

@Injectable()
export class ProjectRoleService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/project_role/';

  list(query: any) {
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(projectRole: any, projectPrivileges: any[]) {
    return this._reqService.post(this._apiBase + 'save', { projectRole: projectRole, projectPrivileges: projectPrivileges });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }
}

