import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueOptService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_opt/';
  _apiAttachmentBase = 'client/issue_attachment/';

  statusTran(id: number, dictStatusId: number) {
    const model = { id: id, dictStatusId: dictStatusId };
    return this._reqService.post(this._apiBase + 'statusTran', model);
  }

  assign(id: number, userId: number, comments: string) {
    const model = { id: id, userId: userId, comments: comments };
    return this._reqService.post(this._apiBase + 'assign', model);
  }

  saveAttachment(issueId: number, name: string, path: any) {
    return this._reqService.post(this._apiAttachmentBase + 'save',
      { issueId: issueId, name: name, path: path });
  }

  removeAttachment(issueId: number, id: number) {
    return this._reqService.post(this._apiAttachmentBase + 'remove',
      { issueId: issueId, id: id });
  }

}
