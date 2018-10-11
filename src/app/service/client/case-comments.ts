import { Injectable } from '@angular/core';
import { RequestService } from '../request';

import * as _ from 'lodash';

@Injectable()
export class CaseCommentsService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/case_comments/';

  save(caseId: number, comment: string) {
    _.merge(comment, { caseId: caseId });
    return this._reqService.post(this._apiBase + 'save', comment);
  }
  remove(id: number) {
    return this._reqService.post(this._apiBase + 'delete', { id: id });
  }

}

