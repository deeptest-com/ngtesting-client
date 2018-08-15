import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from './request';

@Injectable()
export class EnvService {
  constructor(private _reqService: RequestService) { }
  apiUrl = 'env/';

  list(queryModel: any) {
    return this._reqService.post(this.apiUrl + 'list', queryModel);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this.apiUrl + 'get', model);
  }

  save(model: any) {
    return this._reqService.post(this.apiUrl + 'save', model);
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this.apiUrl + 'delete', model);
  }

  changeOrder(id: number, act: string) {
    let model = { id: id, act: act };
    return this._reqService.post(this.apiUrl + 'changeOrder', model);
  }

}

