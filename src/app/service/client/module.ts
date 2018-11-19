import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class ModuleService {
  constructor(private _reqService: RequestService) { }
  apiBase = 'client/module/';

  list(queryModel: any) {
    return this._reqService.post(this.apiBase + 'list', queryModel);
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
    const model = { id: id, act: act };
    return this._reqService.post(this.apiBase + 'changeOrder', model);
  }

}
