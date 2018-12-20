import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { RequestService } from '../request';

@Injectable()
export class ProjectService {
  constructor(private _reqService: RequestService, private _state: GlobalState) {
  }

  _apiBase = 'client/project/';

  list(query: any) {
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  getInfo(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'getInfo', model);
  }
  getUsers(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'getUsers', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }
  saveMembers(model: any, entityTypeAndIds: string[]) {
    _.merge(model, { entityTypeAndIds: entityTypeAndIds });
    return this._reqService.post(this._apiBase + 'saveMembers', model);
  }
  changeRole(projectId: number, roleId: number, entityId: number) {
    return this._reqService.post(this._apiBase + 'changeRole',
      { projectId: projectId, roleId: roleId, entityId: entityId });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  view(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'view', model);
  }
  change(projectId: number) {
    const model = { id: projectId };
    return this._reqService.post(this._apiBase + 'change', model);
  }
}

