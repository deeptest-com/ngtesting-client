import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { RequestService } from '../request';

@Injectable()
export class ProjectService {
  constructor(private _reqService: RequestService, private _state: GlobalState) {
  }

  _apiBase = 'client/project/';

  list(query: any) {
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { projectId: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }
  getInfo(id: number) {
    const model = { projectId: id };
    return this._reqService.post(this._apiBase + 'getInfo', model);
  }
  delete(id: number) {
    const model = { projectId: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  view(id: number) {
    const model = { projectId: id };
    return this._reqService.post(this._apiBase + 'view', model);
  }
  changeContext(projectId: number) {
    const model = { projectId: projectId };
    return this._reqService.post(this._apiBase + 'changeContext', model);
  }
  initContext(projectId: number) {
    const model = { projectId: projectId };
    return this._reqService.post(this._apiBase + 'initContext', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }
}

