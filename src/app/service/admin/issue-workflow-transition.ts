import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueWorkflowTransitionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_workflow_transition/';

  get(model: any) {
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(model: any, projectRoles: any[]) {
    const projectRoleIds: number[] = projectRoles
      .filter(function (item) { return item.selected; })
      .map(function (item) {
        return item.id;
      });

    return this._reqService.post(this._apiBase + 'save',
      { model: model, projectRoleIds: projectRoleIds });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

}

