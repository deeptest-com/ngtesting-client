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
    console.log('PrjResolve - canActivate', CONSTANT.CURR_PRJ_ID, context.projectId);

    if (!CONSTANT.PRJ_PRIVILEGES && context.projectId) { //  未初始化过
      return this.projectService.initContext(context.projectId).toPromise().then(json => {
        if (json.type == 'project') {
          CONSTANT.PRJ_PRIVILEGES = json.prjPrivileges;

          CONSTANT.CASE_CUSTOM_FIELDS = json.caseCustomFields;
          CONSTANT.CASE_PROPERTY_MAP = json.casePropMap;
          CONSTANT.CASE_PROPERTY_VAL_MAP = json.casePropValMap;

          CONSTANT.ISU_PROPERTY_MAP = json.issuePropMap;
          CONSTANT.ISU_PROPERTY_VAL_MAP = json.issuePropValMap;
          CONSTANT.ISU_TRANS_MAP = json.issueTransMap;
        }
        return true;
      });
    } else if (CONSTANT.CURR_PRJ_ID != context.projectId) {
      return this.projectService.changeContext(context.projectId).toPromise().then(json => {
        const project = json.data;
        if (project.type == 'project') {
          CONSTANT.CURR_PRJ_ID = project.id;
          CONSTANT.CURR_PRJ_NAME = project.name;

          CONSTANT.PRJ_PRIVILEGES = json.prjPrivileges;

          CONSTANT.CASE_CUSTOM_FIELDS = json.caseCustomFields;
          CONSTANT.CASE_PROPERTY_MAP = json.casePropMap;
          CONSTANT.CASE_PROPERTY_VAL_MAP = json.casePropValMap;

          CONSTANT.ISU_PROPERTY_MAP = json.issuePropMap;
          CONSTANT.ISU_PROPERTY_VAL_MAP = json.issuePropValMap;
          CONSTANT.ISU_TRANS_MAP = json.issueTransMap;
        }
        return true;
      });
    } else {
      return true;
    }
  }
}
