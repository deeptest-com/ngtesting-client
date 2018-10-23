import { Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';
import { IssueService } from '../../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'issue-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./table.scss'],
  templateUrl: './table.html',
})
export class IssueTable implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueView';

  @Input() issues: any[] = [];
  @Input() columns: any[] = [];

  orgId: number;
  prjId: number;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _issueService: IssueService) {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  clickOptMenu(item: any, act: string) {
    console.log(item, act);

    if (act === 'view' || act === 'edit') {
      const url = '/pages/org/' + this.orgId + '/prj/' + this.prjId + '/issue/' + item.id + '/' + act;
      this._routeService.navTo(url);
    }
  }

  ngOnDestroy(): void {

  }
}
