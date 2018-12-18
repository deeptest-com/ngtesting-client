import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueSearchService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_search/';

  idAndTitleSearch(text, exceptIds) {
    return this._reqService.post(this._apiBase + 'idAndTitleSearch',
      {text: text, exceptIds: exceptIds});
  }

}
