import { Injectable } from '@angular/core';
import { RequestService } from '../request';

import * as _ from 'lodash';

@Injectable()
export class CaseStepService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/case_step/';

  save(caseId: number, caseStep: any) {
    _.merge(caseStep, { caseId: caseId } );
    return this._reqService.post(this._apiBase + 'save', caseStep);
  }

  delete(caseStepId: number) {
    return this._reqService.post(this._apiBase + 'delete', { id: caseStepId });
  }

  up(caseStepId: number, ordr: number) {
    const data = { id: caseStepId, ordr: ordr };
    return this._reqService.post(this._apiBase + 'up', data);
  }

  down(caseStepId: number, ordr: number) {
    const data = { id: caseStepId, ordr: ordr };
    return this._reqService.post(this._apiBase + 'down', data);
  }

}

