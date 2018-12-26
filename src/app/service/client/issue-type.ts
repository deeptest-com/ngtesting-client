import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueTypeService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/issue_type/';

  getByProject() {
    const model = { };
    return this._reqService.post(this._apiBase + 'getByProject', model);
  }

  setByProject(solutionId: number) {
    const model = { solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'setByProject', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }

}

