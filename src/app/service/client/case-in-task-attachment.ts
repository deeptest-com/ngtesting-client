import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class CaseInTaskAttachmentService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/case_in_task_attachment/';

  uploadAttachment(caseInTaskId: number, name: string, path: any) {
    return this._reqService.post(this._apiBase + 'upload', { caseInTaskId: caseInTaskId, name: name, path: path });
  }

  removeAttachment(caseInTaskId: number, id: number) {
    return this._reqService.post(this._apiBase + 'remove', { caseInTaskId: caseInTaskId, id: id });
  }
}
