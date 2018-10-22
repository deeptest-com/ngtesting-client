import { Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
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

  constructor(private _state: GlobalState, private _issueService: IssueService) {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {

  }
}

