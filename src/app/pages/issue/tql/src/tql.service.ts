
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../../../service/request';

import { CONSTANT } from '../../../../utils/constant';
import { GlobalState } from '../../../../global.state';
import { RouteService } from '../../../../service/route';

@Injectable()
export class TqlService {
  _apiUrl = 'tql/';
  _getAllFiltersUrl = this._apiUrl + 'getAllFilters';

  constructor(private _reqService: RequestService) {

  }

  getAllFilters() {
    return this._reqService.post(this._getAllFiltersUrl, { tql: CONSTANT.ISSUE_TQL } );
  }

  tqlToModel (tql: string) {

  }

  modelToTql (model: any) {

  }
}

