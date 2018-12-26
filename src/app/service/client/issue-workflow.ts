import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueWorkflowService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/issue_workflow/';

  getByProject() {
    const model = { };
    return this._reqService.post(this._apiBase + 'getByProject', model);
  }

  setByProject(solutionId: number) {
    const model = { solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'setByProject', model);
  }

}

