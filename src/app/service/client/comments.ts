import { Injectable } from '@angular/core';
import { RequestService } from '../request';

import * as _ from 'lodash';

@Injectable()
export class CommentsService {
  constructor(private _reqService: RequestService) {
  }

  _apiBase = 'client/comments/';

  save(modelId: number, modelType: string, comment: string) {
    _.merge(comment, { modelId: modelId, modelType: modelType });
    return this._reqService.post(this._apiBase + 'save', comment);
  }
  remove(id: number) {
    return this._reqService.post(this._apiBase + 'delete', { id: id });
  }

}

