import { Component, OnInit, OnDestroy } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../global.state';

import { CONSTANT } from '../../utils/constant';
import { WS_CONSTANT } from '../../utils/ws-constant';
import { RouteService } from '../../service/route';
import { BaMenuService } from '../../theme';
import { ORG_MENU } from './org.menu';

import { OrgService } from '../../service/org';

import * as _ from "lodash";

@Component({
  selector: 'org-admin',
  styleUrls: ['./org-admin.scss'],
  templateUrl: './org-admin.html',
})
export class OrgAdmin implements OnInit, OnDestroy {
  eventCode: string = 'OrgAdmin';

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private orgService: OrgService, private _menuService: BaMenuService) {

    this._state.subscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_ORG_SETTINGS + ' in ' + this.eventCode, json);

      this.updateMenu(json.defaultOrgName, json.orgPrivileges);
    });

  }

  ngOnInit() {
    this.updateMenu(CONSTANT.CURR_ORG_NAME, CONSTANT.ORG_PRIVILEGES);
  }

  updateMenu(defaultOrgName: string, orgPrivileges: any) {
    let menu = _.cloneDeep(ORG_MENU);
    if (orgPrivileges['org-admin']) {
      menu[0].children[0].data.menu.title = defaultOrgName;
    } else {
      menu[0].children.pop();
      menu[0].children.pop();
      menu[0].children.pop();
    }
    this._menuService.updateMenuByRoutes(<Routes> menu);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode);
  }

}
