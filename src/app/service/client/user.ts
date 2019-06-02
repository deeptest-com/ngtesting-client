import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

import { GlobalState } from '../../global.state';
import { RouteService } from '../route';

@Injectable()
export class UserService {
  constructor(private _state: GlobalState, private _routeService: RouteService, private _reqService: RequestService) { }
  private _apiBase = 'client/user/';

  getProjectUsers() {
    const model = { };
    return this._reqService.post(this._apiBase + 'getProjectUsers', model);
  }
  searchProjectUser(keywords: string, exceptIds: any[]) {
    const model = { keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._apiBase + 'searchProjectUser', model);
  }

}

