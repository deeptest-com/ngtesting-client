import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { RequestService } from '../request';
import {CONSTANT} from "../../utils";

@Injectable()
export class IssueQueryService {
  constructor(private _reqService: RequestService, private _state: GlobalState) {
  }

  _apiBase = 'client/issue_query/';

  list(query: any, page: number, pageSize: number) {
    _.merge(query, { page: page, pageSize: pageSize });
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  save(model: any) {
    return this._reqService.post(this._apiBase + 'save', { model: model });
  }
  update(model: any) {
    return this._reqService.post(this._apiBase + 'update', { model: model });
  }

  delete(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

}

