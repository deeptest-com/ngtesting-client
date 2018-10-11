import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class ReportService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'client/report/';

  orgReport(orgId: number) {
    return this._reqService.post(this._apiBase + 'org', { orgId: orgId });
  }
  projectReport(projectId: number) {
    return this._reqService.post(this._apiBase + 'project', { projectId: projectId });
  }

  planReport(planId: number) {
    return this._reqService.post(this._apiBase + 'plan', { planId: planId });
  }

  list(query: any, pageNumb: number, pageSize: number) {
    _.merge(query, { pageNumb: pageNumb, pageSize: pageSize });
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }
}
