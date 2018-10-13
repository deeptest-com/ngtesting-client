
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../../../service/request';

import { CONSTANT } from '../../../../utils/constant';
import { GlobalState } from '../../../../global.state';
import { RouteService } from '../../../../service/route';

@Injectable()
export class TqlService {
  _apiUrl = 'client/tql/';
  _query = this._apiUrl + 'query';

  constructor(private _reqService: RequestService) {

  }

  query() {
    return this._reqService.post(this._query, { tql: CONSTANT.ISSUE_JQL } );
  }

}

