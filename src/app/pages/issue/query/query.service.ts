
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../../service/request';

import { CONSTANT } from '../../../utils/constant';
import { GlobalState } from '../../../global.state';
import { RouteService } from '../../../service/route';

@Injectable()
export class IssueQueryService {
  _apiUrl = 'client/issue_query/';

  constructor(private _reqService: RequestService) {
  }

  addToFavorites(queryName: string, rule: any) {
    return this._reqService.post(this._apiUrl + 'save', { queryName: queryName, rule: rule } );
  }

}

