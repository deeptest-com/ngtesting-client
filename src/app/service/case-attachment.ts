import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { RequestService } from './request';

@Injectable()
export class CaseAttachmentService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'case_attachment/';

  uploadAttachment(caseId: number, name: string, path: any) {
    return this._reqService.post(this._api_url + 'upload', { caseId: caseId, name: name, path: path });
  }

  removeAttachment(caseId: number, id: number) {
    return this._reqService.post(this._api_url + 'remove', { caseId: caseId, id: id });
  }
}
