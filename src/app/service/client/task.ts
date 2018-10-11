import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class TaskService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/task/';

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  saveTask(prjId: number, planId: number, task: any, suites: any[]) {
    const assignees: any[] = [];
    task.assignees.forEach(item => { assignees.push({id: item.id}); });

    return this._reqService.post(this._apiBase + 'save',
      { projectId: prjId, envId: task.envId, planId: planId, id: task.id,
        name: task.name, userId: task.userId, assignees: assignees, suites: suites });
  }

  saveTaskCases(projectId: number, caseProjectId: number, planId: number, taskId: number, cases: any[]) {
    const ids: number[] = cases.map(function (item, index, input) {
      return item.id;
    });
    return this._reqService.post(this._apiBase + 'saveCases',
      { projectId: projectId, caseProjectId: caseProjectId, planId: planId, taskId: taskId, cases: ids });
  }

  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }
  close(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'close', model);
  }

}

