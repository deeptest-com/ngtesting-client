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
  queryForRunSelection(projectId: number, caseProjectId: number, runId: number) {
    return this._reqService.post(this._api_url + 'queryForRunSelection',
      { projectId: projectId, caseProjectId: caseProjectId , runId: runId });
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  rename(projectId: number, model: any) {
    _.merge(model, { projectId: projectId });
    return this._reqService.post(this._api_url + 'rename', model);
  }
  save(projectId: number, model: any) {
    const data = _.clone(model);
    data.steps = null;
    _.merge(data, { projectId: projectId });
    return this._reqService.post(this._api_url + 'save', data);
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

  reviewPass(id: number, pass: boolean) {
    return this._reqService.post(this._api_url + 'reviewPass', { id: id, pass: pass });
  }

}
