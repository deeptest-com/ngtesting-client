import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from './request';
import { CONSTANT } from '../utils/constant';

@Injectable()
export class OrgService {
  constructor(private _reqService: RequestService) { }
  _api_url = 'org/';

  list(query: any) {
    return this._reqService.post(this._api_url + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  view(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'view', model);
  }

  save(org: any) {
    return this._reqService.post(this._api_url + 'save', org);
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'delete', model);
  }

  change(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'change', model);
  }

  setDefault(id: number, queryModel: any) {
    let model = { id: id, keywords: queryModel.keywords, disabled: queryModel.disabled };
    return this._reqService.post(this._api_url + 'setDefault', model);
  }

}

