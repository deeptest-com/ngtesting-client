import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssuePageTabService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_page_tab/';

  add(tab: any) {
    return this._reqService.post(this._apiBase + 'add', tab);
  }
  get(id: number) {
    const model = { id: id };
    return this._reqService.post(this._apiBase + 'get', model);
  }

  updateName(id: number, name: number) {
    const model = { id: id, name: name };
    return this._reqService.post(this._apiBase + 'updateName', model);
  }

  remove(id: number, pageId: number, currTabId: number) {
    const model = { id: id, pageId: pageId, currTabId: currTabId };
    return this._reqService.post(this._apiBase + 'remove', model);
  }

  changeOrder(id: number, act: string) {
    const model = { id: id, act: act };
    return this._reqService.post(this._apiBase + 'changeOrder', model);
  }

}

