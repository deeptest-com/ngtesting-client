import { Component, ViewEncapsulation, NgModule, Pipe, Input,
  OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { IssueService } from '../../../../service/client/issue';
import { DateFormatPipe } from '../../../../pipe/date';

declare var jQuery;

@Component({
  selector: 'issue-prop-in-table',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  template: `
    <span>{{val}}</span>
  `,
})
export class IssuePropInTable implements OnInit {
  @Input() model: any = {};
  @Input() col: any = {};
  issuePropValMap: any;

  val: any;

  constructor(private _state: GlobalState, private dateFormat: DateFormatPipe,
              private _issueService: IssueService) {
    this.issuePropValMap = CONSTANT.ISU_PROPERTY_VAL_MAP;
  }

  ngOnInit() {
    this.val = this.getLabel();
  }

  getLabel() {
    // console.log(this.col, this.model);

    const code = this.col.code;
    const val = this.model[code];

    if (this.col.buildIn && this.col.input == 'dropdown') { // buildIn只有一种选项控件
      return this.issuePropValMap[code][val];
    } else if (this.col.input == 'date') {
      return this.dateFormat.transform(val, 'yyyy-mm-dd');
    } else if (this.col.input == 'datetime') {
      return this.dateFormat.transform(val, 'yyyy-mm-dd hh:mm');
    }

    return val;
  }
}

