import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class AitaskService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/aitask/';

  query(orgId: number, projectId: number) {
    return this._reqService.post(this._apiBase + 'query', { orgId: orgId, projectId: projectId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  rename(projectId: number, model: any) {
    _.merge(model, { projectId: projectId });
    return this._reqService.post(this._apiBase + 'rename', model);
  }
  move(projectId: number, data: any) {
    _.merge(data, { projectId: projectId });

    return this._reqService.post(this._apiBase + 'move', data);
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
  run(taskId: number) {
    return this._reqService.post(this._apiBase + 'task', { taskId: taskId });
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._apiBase + 'saveField', model);
  }

}
