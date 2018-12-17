import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueOptService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_opt/';

  watch(id: number, status: boolean) {
    const model = { id: id, status: status };
    return this._reqService.post(this._apiBase + 'watch', model);
  }
  assign(id: number, userId: number, comments: string) {
    const model = { id: id, userId: userId, comments: comments };
    return this._reqService.post(this._apiBase + 'assign', model);
  }

}
