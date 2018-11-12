import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssueTypeSolutionService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_type_solution/';

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

  addType(typeId: number, solutionId: number) {
    const model = { typeId: typeId, solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'addType', model);
  }
  removeType(typeId: number, solutionId: number) {
    const model = { typeId: typeId, solutionId: solutionId };
    return this._reqService.post(this._apiBase + 'removeType', model);
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

