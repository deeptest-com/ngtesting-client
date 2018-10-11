import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';

@Injectable()
export class ScheduleService {
    constructor(private _reqService: RequestService) { }
    _apiBase = 'client/schedule/';

    listByEvent(eventId: number) {
        return this._reqService.post(this._apiBase + 'list', { eventId: eventId, isNest: true });
    }

    get(id: number) {
        return this._reqService.post(this._apiBase + 'get', { eventId: id });
    }

    save(model: any) {
        return this._reqService.post(this._apiBase + 'save', model);
    }

}

