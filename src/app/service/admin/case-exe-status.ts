import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class CaseExeStatusService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/case_exe_status/';

  list() {
    return this._reqService.post(this._apiBase + 'list', {});
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

  changeOrder(id: number, act: string) {
    const model = { id: id, act: act };
    return this._reqService.post(this._apiBase + 'changeOrder', model);
  }
}

