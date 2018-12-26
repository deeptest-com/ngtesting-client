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

    // CONSTANT.CURR_PRJ_ID为空时，pages.resolve会执行相关初始化操作
    if (CONSTANT.CURR_PRJ_ID != null && CONSTANT.CURR_PRJ_ID != context.prjId) {
      return this.projectService.change(context.projectId).toPromise().then(result => {
        const project = result.data;
        if (project.type == 'project') {
          CONSTANT.CURR_PRJ_ID = project.id;
          CONSTANT.CURR_PRJ_NAME = project.name;
        }
        return true;
      });
    } else {
      return true;
    }
  }
}
