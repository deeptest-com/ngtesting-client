import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class ReportService {
  constructor(private _reqService: RequestService) { }
  _apiTestBase = 'client/report_test/';
  _apiIssueBase = 'client/report_issue/';

  orgTestReport(id: number) {
    return this._reqService.post(this._apiTestBase + 'orgTest', { id: id });
  }
  orgIssueReport(id: number) {
    return this._reqService.post(this._apiIssueBase + 'orgIssue', { id: id });
  }

  projectTestReport(id: number) {
    return this._reqService.post(this._apiTestBase + 'projectTest', { id: id });
  }
  projectIssueReport(id: number) {
    return this._reqService.post(this._apiIssueBase + 'projectIssue', { id: id });
  }

  planReport(planId: number) {
    return this._reqService.post(this._apiTestBase + 'plan', { planId: planId });
  }
}
