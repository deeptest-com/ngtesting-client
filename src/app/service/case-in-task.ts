import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class CaseInTaskService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'caseInTask/';

  query(orgId: number, projectId: number, taskId: number) {
    return this._reqService.post(this._api_url + 'query', { orgId: orgId, projectId: projectId, taskId: taskId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  setResult(modelId: number, caseId: number, result: string, nextId: number, status: string) {
    const data = { id: modelId, caseId: caseId, result: result, nextId: nextId, status: status };
    return this._reqService.post(this._api_url + 'setResult', data);
  }

  rename(projectId: number, taskId: number, model: any) {
    _.merge(model, { projectId: projectId, taskId: taskId });
    return this._reqService.post(this._api_url + 'rename', model);
  }
  delete(id: number, entityId: number) {
    const model = { id: id, entityId: entityId };
    return this._reqService.post(this._api_url + 'delete', model);
  }
  move(projectId: number, taskId: number, data: any) {
    _.merge(data, { projectId: projectId, taskId: taskId });

    return this._reqService.post(this._api_url + 'move', data);
  }

}
