import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class ServiceService {
    constructor(private _reqService: RequestService) { }
    _apiBase = 'client/service/';

    list(eventId: number) {
        return this._reqService.post(this._apiBase + 'list', { eventId: eventId });
    }

    get(id: number) {
        return this._reqService.post(this._apiBase + 'get', { eventId: id });
    }

    save(model: number) {
        return this._reqService.post(this._apiBase + 'save', model);
    }

    disable(id: number) {
      return this._reqService.post(this._apiBase + 'disable', { id: id });
    }
}

