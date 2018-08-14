import { Injectable } from '@angular/core';
import { RequestService } from './request';

import * as _ from 'lodash';

@Injectable()
export class CaseStepService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'case_step/';

  save(caseId: number, caseStep: any) {
    _.merge(caseStep, { caseId: caseId } );
    return this._reqService.post(this._api_url + 'save', caseStep);
  }

  delete(caseStepId: number) {
    return this._reqService.post(this._api_url + 'delete', { id: caseStepId });
  }

  up(caseStepId: number, ordr: number) {
    const data = { id: caseStepId, ordr: ordr };
    return this._reqService.post(this._api_url + 'up', data);
  }

  down(caseStepId: number, ordr: number) {
    const data = { id: caseStepId, ordr: ordr };
    return this._reqService.post(this._api_url + 'down', data);
  }

}

