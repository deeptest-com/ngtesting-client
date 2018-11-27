import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueCustomFieldOptionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_custom_field_option/';

  save(model: any, field: any = {}) {
    let data: any = { model: model };
    if (field.id == null) {
      data.field = field;
    } else {
      data.fieldId = field.id;
    }

    return this._reqService.post(this._apiBase + 'save', data);
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

