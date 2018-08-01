import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class AitaskService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'aitask/';

  query(orgId: number, projectId: number) {
    return this._reqService.post(this._api_url + 'query', { orgId: orgId, projectId: projectId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  rename(projectId: number, model: any) {
    _.merge(model, { projectId: projectId });
    return this._reqService.post(this._api_url + 'rename', model);
  }
  move(projectId: number, data: any) {
    _.merge(data, { projectId: projectId });

    return this._reqService.post(this._api_url + 'move', data);
  }
  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'delete', model);
  }

  save(projectId: number, model: any) {
    const data = _.clone(model);
    data.steps = null;
    _.merge(data, { projectId: projectId });
    return this._reqService.post(this._api_url + 'save', data);
  }
  run(taskId: number) {
    return this._reqService.post(this._api_url + 'task', { taskId: taskId });
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._api_url + 'saveField', model);
  }

}
