import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

import { GlobalState } from '../../../global.state';
import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';
import { OrgService } from '../../../service/client/org';
import { SockService } from '../../../service/client/sock';
import { UserService } from '../../../service/client/user';

@Injectable()
export class OrgResolve implements CanActivate {
  constructor(private location: Location, private _state: GlobalState, private _sockService: SockService,
              private userService: UserService, private orgService: OrgService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const context = Utils.getOrgAndPrjId(state.url);
    console.log('OrgResolve - canActivate', state.url, context);

    // 初始化org上下文：
    //    1. 初次加载，CONSTANT.CURR_ORG_ID为空，pages.resolve中
    //    2. 查看Org时
    // 修改CONSTANT.CURR_ORG_ID：
    //    1. 在管Org管理页面
    if (CONSTANT.CURR_ORG_ID != null && CONSTANT.CURR_ORG_ID != context.orgId) {

      // if (this.willNotChangePrj(context) || !context.projectId) {
        return this.orgService.change(context.orgId).toPromise().then(result => {
          CONSTANT.CURR_ORG_ID = context.orgId;
          return true;
        });
      // } else {
      //   CONSTANT.CURR_ORG_ID = context.orgId;
      //   return true;
      // }

    } else {
      return true;
    }
  }

  willNotChangePrj(context: any) {
    return context.projectId == CONSTANT.CURR_PRJ_ID;
  }

}
