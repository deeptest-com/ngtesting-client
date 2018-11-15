import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueWorkflowTransitionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_workflow_transition/';


  save(workflowId: number, srcId: number, dictId: number, projectRoles: any[]) {
    const projectRoleIds: number[] = projectRoles
      .filter(function (item) { return item.selected; })
      .map(function (item) {
        return item.id;
      });

    return this._reqService.post(this._apiBase + 'save', {
      workflowId: workflowId,
      srcId: srcId,
      dictId: dictId,
      projectRoleIds: projectRoleIds });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

}

