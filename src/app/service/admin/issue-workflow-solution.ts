import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueWorkflowSolutionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_workflow_solution/';

  load() {
    return this._reqService.post(this._apiBase + 'load', {});
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }
  getConfig(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'getConfig', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', model);
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  changeItem(type: string, workflow: string, solutionId: number) {
    const model = { type: type.split('-')[0], workflow: workflow.split('-')[0],
      solutionId: solutionId};
    return this._reqService.post(this._apiBase + 'changeItem', model);
  }

  setDefault(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'setDefault', model);
  }

}

