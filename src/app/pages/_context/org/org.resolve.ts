import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

import { GlobalState } from '../../../global.state';
import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';
import { SockService } from '../../../service/sock';
import { UserService } from '../../../service/user';
import { OrgService } from '../../../service/org';

@Injectable()
export class OrgResolve implements CanActivate {
  constructor(private location: Location, private _state: GlobalState, private _sockService: SockService,
              private userService: UserService, private orgService: OrgService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const context = Utils.getOrgAndPrjId(state.url);
    console.log('OrgResolve - canActivate', state.url, context);

    if (context.orgId != CONSTANT.CURR_ORG_ID) {
      if (this.willNotChangePrj(context) || !context.prjId) {
        return this.orgService.change(context.orgId).toPromise().then(result => {
          CONSTANT.CURR_ORG_ID = context.orgId;
          return true;
        });
      } else {
        CONSTANT.CURR_ORG_ID = context.orgId;
        return true;
      }

    } else {
      return true;
    }
  }

  willNotChangePrj(context: any) {
    return context.prjId == CONSTANT.CURR_PRJ_ID;
  }

}
