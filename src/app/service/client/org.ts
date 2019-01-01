import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';
import { CONSTANT } from '../../utils/constant';

@Injectable()
export class OrgService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/org/';

  view(id: number) {
    const model = { orgId: id };
    return this._reqService.post(this._apiBase + 'view', model);
  }

  changeContext(id: number) {
    const model = { orgId: id };
    return this._reqService.post(this._apiBase + 'changeContext', model);
  }

}

