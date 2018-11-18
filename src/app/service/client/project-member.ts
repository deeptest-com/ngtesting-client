import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { RequestService } from '../request';

@Injectable()
export class ProjectMemberService {
  constructor(private _reqService: RequestService, private _state: GlobalState) {
  }

  _apiBase = 'client/project_member/';

  getUsers(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'getUsers', model);
  }

  saveMembers(model: any, entityTypeAndIds: string[]) {
    _.merge(model, { entityTypeAndIds: entityTypeAndIds });
    return this._reqService.post(this._apiBase + 'saveMembers', model);
  }
  changeRole(projectId: number, roleId: number, entityId: number) {
    return this._reqService.post(this._apiBase + 'changeRole',
      { projectId: projectId, roleId: roleId, entityId: entityId });
  }

}

