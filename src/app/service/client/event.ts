import * as _ from 'lodash';

import {Injectable} from '@angular/core';

import {CONSTANT} from '../../utils/constant';
import {RequestService} from '../request';

@Injectable()
export class EventService {
    constructor(private _reqService: RequestService) { }
    _apiBase = 'client/event/';

    list(pageSize: number, page: number, status: string) {
        return this._reqService.post(this._apiBase + 'list', {pageSize: pageSize, page: page, status: status});
    }

    get(id: number) {
        return this._reqService.post(this._apiBase + 'get', {eventId: id});
    }

    save(model: number) {
        return this._reqService.post(this._apiBase + 'save', model);
    }
}

