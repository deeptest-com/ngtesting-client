import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class SuiteService {
  constructor(private _reqService: RequestService) {
  }

  _apiUrl = 'suite/';

  query(projectId: number, query: any) {
    _.merge(query, { projectId: projectId });
    return this._reqService.post(this._apiUrl + 'query', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiUrl + 'get', model);
  }

  save(projectId: number, model: any) {
    const data = _.clone(model);
    data.projectId = projectId;
    return this._reqService.post(this._apiUrl + 'save', data);
  }

  saveSuiteCases(suiteId: number, cases: any[]) {
    const ids: number[] = cases.map(function (item, index, input) {
      return item.id;
    });
    return this._reqService.post(this._apiUrl + 'saveCases', { suiteId: suiteId, cases: ids });
  }

  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiUrl + 'delete', model);
  }
  close(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiUrl + 'close', model);
  }

  markAllRead(ids: number[]) {
    return this._reqService.post(this._apiUrl + 'markAllRead', { ids: ids });
  }
}

