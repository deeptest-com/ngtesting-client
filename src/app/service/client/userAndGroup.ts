import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class UserAndGroupService {
  constructor(private _reqService: RequestService) { }
  private _apiBase = 'client/userAndGroup/';

  search(keywords: string, exceptIds: string[]) {
    const model = { keywords: keywords, exceptIds: exceptIds };
    return this._reqService.post(this._apiBase + 'search', model);
  }

}

