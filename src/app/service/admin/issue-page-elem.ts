import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssuePageElemService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_page_elem/';

  saveAll(pageId: number, tabId: number, elems: any[]) {
    const model = { pageId: pageId, tabId: tabId, elems: elems };
    return this._reqService.post(this._apiBase + 'saveAll', model);
  }

  // add(elem: any) {
  //   return this._reqService.post(this._apiBase + 'add', elem);
  // }
  //
  // remove(id: number, tabId: number) {
  //   const model = { id: id, tabId: tabId };
  //   return this._reqService.post(this._apiBase + 'remove', model);
  // }
  //
  // changeOrder(id: number, act: string) {
  //   const model = { id: id, act: act };
  //   return this._reqService.post(this._apiBase + 'changeOrder', model);
  // }
}

