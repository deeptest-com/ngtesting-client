import {
  Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';
import { IssueService } from '../../../../service/client/issue';
import {Utils} from "../../../../utils";
import {IssueOptService} from "../../../../service/client/issue-opt";
import {PrivilegeService} from "../../../../service/privilege";

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
  @Input() orderBy: any[] = [];
  @Input() batchModel: boolean;

  @Output() dealWithIssueEvent = new EventEmitter<any>();
  @Output() orderEvent = new EventEmitter<any>();
  @Output() columnOrderEvent = new EventEmitter<any>();

  orderByMap: any = {};

  priv: any = {};

  constructor(private privilegeService: PrivilegeService) {
    this.priv = this.privilegeService.issuePrivilege();
  }

  ngOnInit() {
    this.dealwithOrderMap();
  }

  ngAfterViewInit() {}

  dealWithIssue($event) {
    console.log($event);
    this.dealWithIssueEvent.emit($event);
  }

  order(col) {
    this.orderBy = Utils.reverseOrder(col, this.orderBy);
    this.dealwithOrderMap();
    this.orderEvent.emit(this.orderBy);
  }

  dealwithOrderMap () {
    this.orderByMap = {};
    this.orderBy.forEach((it, index) => {
      console.log('it', it, it.key);
      this.orderByMap[it.key] = it.val;
    });
  }

  onThDropSuccess(col) {
    this.columnOrderEvent.emit();
  }

  ngOnDestroy(): void {

  }
}
