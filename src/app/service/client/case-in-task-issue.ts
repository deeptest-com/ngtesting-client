import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class CaseInTaskIssueService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/case_in_task_issue/';

  save(caseInTaskId: number, issueId: string) {
    return this._reqService.post(this._apiBase + 'save',
      { caseInTaskId: caseInTaskId, issueId: issueId });
  }

  remove(caseInTaskId: number, id: number) {
    return this._reqService.post(this._apiBase + 'remove',
      { caseInTaskId: caseInTaskId, id: id });
  }
}
