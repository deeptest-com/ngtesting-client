import {
  Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';
import { IssueService } from '../../../../service/client/issue';
import {Utils} from "../../../../utils";

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

  orgId: number;
  prjId: number;

  constructor(private elementRef: ElementRef, private _routeService: RouteService,
      private _state: GlobalState, private _issueService: IssueService) {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
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
    console.log('order', this.orderBy);

    this.orderBy = Utils.reverseOrder(col, this.orderBy);
    console.log('reOrder', this.orderBy);

    this.dealwithOrderMap();

    console.log('this.orderByMap', this.orderByMap);

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
    console.log('===', col);

    this.columnOrderEvent.emit();
  }

  ngOnDestroy(): void {

  }
}
