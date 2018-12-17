import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueTagService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_tag/';

  search(issueId, keywords, exceptIds): any {
    const model = { issueId: issueId, keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._apiBase + 'search', model);
  }

  save(issueId, selectedModels): any {
    const model = { issueId: issueId, tags: selectedModels };
    return this._reqService.post(this._apiBase + 'save', model);
  }

}
