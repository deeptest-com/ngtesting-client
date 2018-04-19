import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/toPromise';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { SockService } from '../../../../service/sock';
import { UserService } from '../../../../service/user';
import { ProjectService } from '../../../../service/project';

@Injectable()
export class PrjResolve implements CanActivate {
  constructor(private location: Location, private _state: GlobalState, private _sockService: SockService,
              private userService: UserService, private projectService: ProjectService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const context = Utils.getOrgAndPrjId(state.url);
    console.log('PrjResolve - canActivate', context.prjId, CONSTANT.CURR_PRJ_ID);

    if (context.prjId != CONSTANT.CURR_PRJ_ID) {
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
