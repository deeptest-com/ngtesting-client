import { Injectable } from '@angular/core';
import { RequestService } from '../request';

import * as _ from 'lodash';

@Injectable()
export class CommentsService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/';

  save(modelId: number, modelType: string, comment: string) {
    _.merge(comment, { modelId: modelId });
    return this._reqService.post(this._apiBase + modelType + '_comments/save', comment);
  }
  remove(id: number, modelType: string) {
    return this._reqService.post(this._apiBase + modelType + '_comments/delete', { id: id });
  }

}

