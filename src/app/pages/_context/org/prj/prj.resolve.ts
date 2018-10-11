import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { SockService } from '../../../../service/client/sock';
import { UserService } from '../../../../service/client/user';
import { ProjectService } from '../../../../service/client/project';

@Injectable()
export class PrjResolve implements CanActivate {
  constructor(private location: Location, private _state: GlobalState, private _sockService: SockService,
              private userService: UserService, private projectService: ProjectService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const context = Utils.getOrgAndPrjId(state.url);
    console.log('PrjResolve - canActivate', context.prjId, CONSTANT.CURR_PRJ_ID);

    // CONSTANT.CURR_PRJ_ID，pages.resolve会执行相关操作
    if (CONSTANT.CURR_PRJ_ID != context.prjId) { // CONSTANT.CURR_PRJ_ID != null &&
      return this.projectService.change(context.prjId).toPromise().then(result => {
        const prj = result.data;
        if (prj.type == 'project') {
          CONSTANT.CURR_PRJ_ID = prj.id;
          CONSTANT.CURR_PRJ_NAME = prj.name;
        }
        return true;
      });
    } else {
      return true;
    }
  }
}
