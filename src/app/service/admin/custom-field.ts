import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class CustomFieldService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/custom_field/';

  list(queryModel: any) {
    return this._reqService.post(this._apiBase + 'list', queryModel);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  changeOrder(id: number, act: string, queryModel: any) {
    _.merge(queryModel, { id: id, act: act });
    return this._reqService.post(this._apiBase + 'changeOrder', queryModel);
  }
}

