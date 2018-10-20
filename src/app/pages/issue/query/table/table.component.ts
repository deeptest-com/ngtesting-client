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

  constructor(private _state: GlobalState, private _issueService: IssueService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {

  }
}

