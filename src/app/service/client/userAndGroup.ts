import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class UserAndGroupService {
  constructor(private _reqService: RequestService) { }
  private _apiBase = 'client/userAndGroup/';

  searchInOrg(keywords: string, exceptUserIds: string[], exceptGroupIds: string[]) {
    const model = { keywords: keywords, exceptUserIds: exceptUserIds, exceptGroupIds: exceptGroupIds };
    return this._reqService.post(this._apiBase + 'searchInOrg', model);
  }

}

