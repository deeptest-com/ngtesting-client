import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { RequestService } from '../request';

@Injectable()
export class ReportService {
  constructor(private _reqService: RequestService) { }
  _apiTestBase = 'client/report_test/';
  _apiIssueBase = 'client/report_issue/';

  orgTestReport(orgId: number) {
    return this._reqService.post(this._apiTestBase + 'orgTest', { orgId: orgId });
  }
  orgIssueReport(orgId: number) {
    return this._reqService.post(this._apiIssueBase + 'orgIssue', { orgId: orgId });
  }

  projectTestReport(projectId: number) {
    return this._reqService.post(this._apiTestBase + 'projectTest', { projectId: projectId });
  }
  projectIssueReport(projectId: number) {
    return this._reqService.post(this._apiIssueBase + 'projectIssue', { projectId: projectId });
  }

  planReport(planId: number) {
    return this._reqService.post(this._apiTestBase + 'plan', { planId: planId });
  }
}
