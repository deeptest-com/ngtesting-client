import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';
import { CONSTANT } from '../../utils/constant';

@Injectable()
export class OrgAdmin {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/org/';

  list(query: any) {
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(org: any) {
    return this._reqService.post(this._apiBase + 'save', org);
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  setDefault(id: number, queryModel: any) {
    const model = { id: id, keywords: queryModel.keywords, disabled: queryModel.disabled };
    return this._reqService.post(this._apiBase + 'setDefault', model);
  }

}

