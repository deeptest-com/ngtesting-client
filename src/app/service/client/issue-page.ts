import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssuePageService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/issue_page/';

  get(id) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  getByProject() {
    const model = { };
    return this._reqService.post(this._apiBase + 'getByProject', model);
  }

  setByProject(solutionId: number) {
    const model = { solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'setByProject', model);
  }

}

