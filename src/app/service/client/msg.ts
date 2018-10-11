import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class MsgService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/msg/';

  list(query: any, page: number, pageSize: number) {
    _.merge(query, { page: page, pageSize: pageSize });
    return this._reqService.post(this._apiBase + 'list', query);
  }

  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  delete(id: any) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'delete', model);
  }

  markAllRead() {
    return this._reqService.post(this._apiBase + 'markAllRead', {});
  }
  markRead(id: number) {
    return this._reqService.post(this._apiBase + 'markRead', { id: id });
  }
}

