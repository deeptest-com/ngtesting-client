import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../request';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONSTANT } from '../../utils/constant';
import { GlobalState } from '../../global.state';
import { RouteService } from '../route';

@Injectable()
export class UserService {
  constructor(private _state: GlobalState, private _routeService: RouteService, private _reqService: RequestService) { }
  private _apiBase = 'client/user/';

  listLastest() {
    return this._reqService.post(this._apiBase + 'listLastest', {});
  }
  getUsers(projectId: number) {
    const model = { projectId: projectId };
    return this._reqService.post(this._apiBase + 'getUsers', model);
  }
  search(keywords: string, exceptIds: any[]) {
    const model = { keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._apiBase + 'search', model);
  }

}

