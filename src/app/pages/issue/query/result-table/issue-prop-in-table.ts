import { Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { IssueService } from '../../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'issue-prop-in-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  template: `
    <span>{{getLabel()}}</span>
  `,
})
export class IssuePropInTable implements OnInit {
  @Input() model: any = {};
  @Input() col: any = {};
  @Input() issuePropValMap: any = {};

  constructor(private _state: GlobalState, private _issueService: IssueService) {

  }

  ngOnInit() {

  }

  getLabel() {
    // console.log(this.col, this.model);

    const code = this.col.code;
    let val = this.model[code];

    if (this.col.buildIn && this.col.input == 'dropdown') { // buildIn只有一种选项控件
      return this.issuePropValMap[code][val];
    }

    return val;
  }
}

