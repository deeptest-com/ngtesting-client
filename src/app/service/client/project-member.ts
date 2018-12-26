import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { RequestService } from '../request';

@Injectable()
export class ProjectMemberService {
  constructor(private _reqService: RequestService, private _state: GlobalState) {
  }

  _apiBase = 'client/project_member/';

  getUsers() {
    const model = { };
    return this._reqService.post(this._apiBase + 'getUsers', model);
  }

  saveMembers(model: any, entityTypeAndIds: string[]) {
    _.merge(model, { entityTypeAndIds: entityTypeAndIds });
    return this._reqService.post(this._apiBase + 'saveMembers', model);
  }
  changeRole(roleId: number, entityId: number) {
    return this._reqService.post(this._apiBase + 'changeRole',
      { roleId: roleId, entityId: entityId });
  }

  remove(item: any) {
    return this._reqService.post(this._apiBase + 'remove',
      { type: item.type, entityId: item.entityId });
  }

}

