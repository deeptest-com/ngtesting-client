import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueWatchService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_watch/';

  list(issueId: number) {
    const model = { issueId: issueId };
    return this._reqService.post(this._apiBase + 'list', model);
  }

  watch(id: number, status: boolean) {
    const model = { id: id, status: status };
    return this._reqService.post(this._apiBase + 'watch', model);
  }

  batchWatch(issueId: number, userIds: any[]) {
    const model = { issueId: issueId, userIds: userIds };
    return this._reqService.post(this._apiBase + 'batchWatch', model);
  }

  remove(id, issueId) {
    const model = { id: id, issueId: issueId };
    return this._reqService.post(this._apiBase + 'remove', model);
  }

  search(issueId: number, keywords: string, exceptIds: any[]) {
    const model = { issueId: issueId, keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._apiBase + 'search', model);
  }

}
