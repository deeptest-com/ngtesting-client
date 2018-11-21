import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueTypeService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/issue_type/';

  getByProject(projectId: number) {
    const model = { projectId: projectId };
    return this._reqService.post(this._apiBase + 'getByProject', model);
  }

  setByProject(projectId: number, solutionId: number) {
    const model = { projectId: projectId, solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'setByProject', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }

}

