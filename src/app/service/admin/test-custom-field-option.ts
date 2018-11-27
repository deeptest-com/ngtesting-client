import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class TestCustomFieldOptionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/test_custom_field_option/';

  save(model: any, fieldId: number) {
    return this._reqService.post(this._apiBase + 'save', { model: model, fieldId: fieldId });
  }

  delete(id: number, fieldId: number) {
    const model = { id: id, fieldId: fieldId };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  changeOrder(id: number, act: string, fieldId: number) {
    const model = { id: id, act: act, fieldId: fieldId };
    return this._reqService.post(this._apiBase + 'changeOrder', model);
  }

  setDefault(id: number, fieldId: number) {
    const model = { id: id, fieldId: fieldId };
    return this._reqService.post(this._apiBase + 'setDefault', model);
  }

}

