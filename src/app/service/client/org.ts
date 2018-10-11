import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';
import { CONSTANT } from '../../utils/constant';

@Injectable()
export class OrgService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/org/';

  view(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'view', model);
  }

  change(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'change', model);
  }

}

