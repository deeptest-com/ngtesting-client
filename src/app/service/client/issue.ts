import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class IssueService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/issue/';

  query(filter: number, query: any) {
    query.filter = filter;
    return this._reqService.post(this._apiBase + 'query', query);
  }

  get(id: number, opt: string) {
    const model = { id: id, opt: opt };
    return this._reqService.post(this._apiBase + 'get', model);
  }
  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  save(projectId: number, model: any) {
    const data = _.clone(model);
    data.steps = null;
    _.merge(data, { projectId: projectId });
    return this._reqService.post(this._apiBase + 'save', data);
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._apiBase + 'saveField', model);
  }
}
