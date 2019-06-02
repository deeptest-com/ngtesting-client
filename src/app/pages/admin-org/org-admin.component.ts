import { Component, OnInit, OnDestroy } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../global.state';

import { CONSTANT } from '../../utils/constant';
import { WS_CONSTANT } from '../../utils/ws-constant';
import { RouteService } from '../../service/route';
import { BaMenuService } from '../../theme';
import { ORG_MENU } from './org.menu';

import { OrgAdmin } from '../../service/admin/org';

import * as _ from 'lodash';

@Component({
  selector: 'org-admin',
  styleUrls: ['./org-admin.scss'],
  templateUrl: './org-admin.html',
})
export class OrgAdminComponent implements OnInit, OnDestroy {
  eventCode: string = 'OrgAdmin';

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private orgService: OrgAdmin, private _menuService: BaMenuService) {

    this._state.subscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_ORG_SETTINGS + ' in ' + this.eventCode, json);

      this.updateMenu(json.defaultOrgName, json.orgPrivileges);
    });

  }

  ngOnInit() {
    this.updateMenu(CONSTANT.CURR_ORG_NAME, CONSTANT.ORG_PRIVILEGES);
  }

  updateMenu(defaultOrgName: string, orgPrivileges: any) {
    const menu = _.cloneDeep(ORG_MENU);
    menu[0].children[0].data.menu.title = defaultOrgName;
    if (orgPrivileges['org_org:*']) {
      menu[0].children.splice(1, 1);
    } else {
      menu[0].children.splice(2, 3);
    }
    this._menuService.updateMenuByRoutes(<Routes> menu);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode);
  }

}
