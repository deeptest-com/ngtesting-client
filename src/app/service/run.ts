import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class RunService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'run/';

  // loadCase(orgId: number, projectId: number, runId: number) {
  //   return this._reqService.post(this._api_url + 'loadCase', {orgId: orgId, projectId: projectId, runId: runId});
  // }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'get', model);
  }

  saveRun(prjId: number, planId: number, run: any, suites: any[]) {
    const assignees: any[] = [];
    run.assignees.forEach(item => { assignees.push({id: item.id}); });

    return this._reqService.post(this._api_url + 'save',
      { prjId: prjId, envId: run.envId, planId: planId, id: run.id,
        name: run.name, userId: run.userId, assignees: assignees, suites: suites });
  }

  saveRunCases(planId: number, runId: number, cases: any[]) {
    const ids: number[] = cases.map(function (item, index, input) {
      return item.id;
    });
    return this._reqService.post(this._api_url + 'saveCases', { planId: planId, runId: runId, cases: ids });
  }

  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'delete', model);
  }
  close(id: any) {
    const model = { id: id };
    return this._reqService.post(this._api_url + 'close', model);
  }

}

