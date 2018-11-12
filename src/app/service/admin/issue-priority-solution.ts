import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssuePrioritySolutionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_priority_solution/';

  list() {
    return this._reqService.post(this._apiBase + 'list', {});
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  addPriority(priorityId: number, solutionId: number) {
    const model = { priorityId: priorityId, solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'addPriority', model);
  }
  removePriority(priorityId: number, solutionId: number) {
    const model = { priorityId: priorityId, solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'removePriority', model);
  }

  addAll(solutionId: number) {
    const model = { solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'addAll', model);
  }
  removeAll(solutionId: number) {
    const model = { solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'removeAll', model);
  }
}

