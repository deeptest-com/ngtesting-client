import { Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { IssueService } from '../../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'item-prop',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  template: `
    <span>{{col.code | idToName}} - </span>
    <span *ngIf="col.type=='string'">{{item[col.code | idToName]}}</span>
    <span *ngIf="col.type=='date'">{{item[col.code] | date:'y/MM/dd HH:mm:ss'}}</span>
  `,
})
export class ItemProp implements OnInit {
  @Input() item: any = {};
  @Input() col: any = {};

  constructor(private _state: GlobalState, private _issueService: IssueService) {

  }

  ngOnInit() {

  }
}

