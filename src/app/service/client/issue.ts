import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue/';

  query(filter: number, query: any) {
    query.filter = filter;
    return this._reqService.post(this._apiBase + 'query', query);
  }

  create() {
    return this._reqService.post(this._apiBase + 'create', {});
  }
  edit(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'edit', model);
  }
  view(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'view', model);
  }

  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  save(model: any, pageId: number) {
    return this._reqService.post(this._apiBase + 'save', { issue: model, pageId: pageId });
  }
  update(model: any, pageId: number) {
    return this._reqService.post(this._apiBase + 'update', { issue: model, pageId: pageId });
  }

  saveField(id: number, field: any) {
    const model = _.merge(field, { id: id });
    return this._reqService.post(this._apiBase + 'saveField', model);
  }

  gotoList() {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/query/lastest';
    this._routeService.navTo(url);
  }
}
