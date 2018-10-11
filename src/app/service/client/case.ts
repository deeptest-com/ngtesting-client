import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class CaseService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/case/';

  query() {
    return this._reqService.post(this._apiBase + 'query', {});
  }

  queryForSuiteSelection(projectId: number, caseProjectId: number, suiteId: number) {
    return this._reqService.post(this._apiBase + 'queryForSuiteSelection',
      { projectId: projectId, caseProjectId: caseProjectId, suiteId: suiteId });
  }
  queryForTaskSelection(projectId: number, caseProjectId: number, taskId: number) {
    return this._reqService.post(this._apiBase + 'queryForTaskSelection',
      { projectId: projectId, caseProjectId: caseProjectId , taskId: taskId });
  }

  get(id: number) {
    return this._reqService.post(this._apiBase + 'get', { id: id });
  }

  rename(model: any) {
    return this._reqService.post(this._apiBase + 'rename', model);
  }
  update(model: any) {
    const data = _.clone(model);
    data.steps = null;
    return this._reqService.post(this._apiBase + 'update', data);
  }
  move(data: any) {
    return this._reqService.post(this._apiBase + 'move', data);
  }
  delete(id: any) {
    return this._reqService.post(this._apiBase + 'delete', { id: id });
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._apiBase + 'saveField', model);
  }

  changeContentType(contentType: string, id: number) {
    return this._reqService.post(this._apiBase + 'changeContentType', { id: id, contentType: contentType });
  }

  reviewResult(id: number, result: boolean) {
    return this._reqService.post(this._apiBase + 'reviewResult', { id: id, result: result });
  }

}
