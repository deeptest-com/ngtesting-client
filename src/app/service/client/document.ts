import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class DocumentService {
    constructor(private _reqService: RequestService) { }
    _apiBase = 'client/document/';

    list(pageSize: number, page: number, eventId: number) {
        return this._reqService.post(this._apiBase + 'list', { pageSize: pageSize, page: page, eventId: eventId });
    }

    get(id: number) {
        return this._reqService.post(this._apiBase + 'get', { eventId: id });
    }

    save(model: number) {
        return this._reqService.post(this._apiBase + 'save', model);
    }

    remove(id: number) {
      return this._reqService.post(this._apiBase + 'remove', { id: id });
    }
}

