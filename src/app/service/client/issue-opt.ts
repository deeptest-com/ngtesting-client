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

  getWorkTran(typeId: number, tran: any) {
    let workTran = null;

    if (CONSTANT.ISU_TRANS_MAP[typeId] && CONSTANT.ISU_TRANS_MAP[typeId][tran.srcStatusId]) {
      const definedTrans = CONSTANT.ISU_TRANS_MAP[typeId][tran.srcStatusId];
      definedTrans.forEach(definedTran => {
        if (definedTran.dictStatusId == tran.dictStatusId) {
          workTran = definedTran;
        }
      });
    }

    return workTran;
  }

  statusTran(id: number, dictStatusId: number, dictStatusName: string) {
    const model = { id: id, dictStatusId: dictStatusId, dictStatusName: dictStatusName };
    return this._reqService.post(this._apiBase + 'statusTran', model);
  }

  updateThenStatusTran(issue, tran) {
    const data = _.clone(issue);
    _.unset(data, 'comments');
    _.unset(data, 'attachments');
    _.unset(data, 'histories');
    _.unset(data, 'tags');
    _.unset(data, 'watchList');
    _.unset(data, 'links');

    const model = { issue: data, tran: tran };
    return this._reqService.post(this._apiBase + 'updateThenStatusTran', model);
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
