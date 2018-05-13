import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../global.state';

import { CONSTANT } from '../../utils/constant';
import { RouteService } from '../../service/route';
import { BaMenuService } from '../../theme';
import { ORG_MENU } from './org.menu';

import { OrgService } from '../../service/org';

@Component({
  selector: 'org-admin',
  styleUrls: ['./org-admin.scss'],
  templateUrl: './org-admin.html',
})
export class OrgAdmin implements OnInit {
  orgs: any[];

  constructor(private _state: GlobalState, private _routeService: RouteService,
              private orgService: OrgService, private _menuService: BaMenuService) {

  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes> ORG_MENU);

    this.loadData();
  }

  loadData() {
    this.orgService.list({}).subscribe((json: any) => {
      this.orgs = json.data;
    });
  }

}
