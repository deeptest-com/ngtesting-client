import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class CaseService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'case/';

  query(orgId: number, projectId: number) {
    return this._reqService.post(this._api_url + 'query', { orgId: orgId, projectId: projectId });
  }

  queryForSuiteSelection(projectId: number, caseProjectId: number, suiteId: number) {
    return this._reqService.post(this._api_url + 'queryForSuiteSelection',
      { projectId: projectId, caseProjectId: caseProjectId, suiteId: suiteId });
  }
  queryForTaskSelection(projectId: number, caseProjectId: number, taskId: number) {
    return this._reqService.post(this._api_url + 'queryForTaskSelection',
      { projectId: projectId, caseProjectId: caseProjectId , taskId: taskId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  rename(projectId: number, model: any) {
    _.merge(model, { projectId: projectId });
    return this._reqService.post(this._api_url + 'rename', model);
  }
  update(projectId: number, model: any) {
    const data = _.clone(model);
    data.steps = null;
    _.merge(data, { projectId: projectId });
    return this._reqService.post(this._api_url + 'update', data);
  }
  move(projectId: number, data: any) {
    _.merge(data, { projectId: projectId });

    return this._reqService.post(this._api_url + 'move', data);
  }
  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'delete', model);
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._api_url + 'saveField', model);
  }

  changeContentType(contentType: string, id: number) {
    return this._reqService.post(this._api_url + 'changeContentType', { id: id, contentType: contentType });
  }

  reviewResult(id: number, result: boolean) {
    return this._reqService.post(this._api_url + 'reviewResult', { id: id, result: result });
  }

}
