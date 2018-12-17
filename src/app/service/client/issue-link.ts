import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../../utils/constant';
import { RequestService } from '../request';
import { RouteService } from '../route';

@Injectable()
export class IssueLinkService {
  constructor(private _reqService: RequestService, private _routeService: RouteService) {
  }

  _apiBase = 'client/issue_link/';

  link(srcId, dictId, reason): any {

  }

}
