import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from './request';

@Injectable()
export class VerService {
  constructor(private _reqService: RequestService) { }
  apiUrl = 'ver/';

  list(projectId: number, queryModel: any) {
    queryModel.projectId = projectId;
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

  changeOrder(id: number, act: string, projectId: number) {
    let model = { id: id, act: act, projectId: projectId };
    return this._reqService.post(this.apiUrl + 'changeOrder', model);
  }

}

