import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class EnvService {
  constructor(private _reqService: RequestService) { }
  apiBase = 'client/env/';

  list(queryModel: any) {
    return this._reqService.post(this.apiBase + 'list', queryModel);
  }

  listLastest() {
    return this._reqService.post(this.apiBase + 'listLastest', {});
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this.apiBase + 'get', model);
  }

  save(model: any) {
    return this._reqService.post(this.apiBase + 'save', model);
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this.apiBase + 'delete', model);
  }

  changeOrder(id: number, act: string) {
    let model = { id: id, act: act };
    return this._reqService.post(this.apiBase + 'changeOrder', model);
  }

}

