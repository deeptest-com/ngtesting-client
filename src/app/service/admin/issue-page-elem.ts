import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class IssuePageElemService {
  constructor(private _reqService: RequestService) { }
  _apiBase = 'admin/issue_page_elem/';

  saveAll(pageId: number, elems: any[]) {
    const model = { pageId: pageId, elems: elems };
    return this._reqService.post(this._apiBase + 'saveAll', model);
  }

  updateProp(data: any) {
    return this._reqService.post(this._apiBase + 'updateProp', data);
  }
}

