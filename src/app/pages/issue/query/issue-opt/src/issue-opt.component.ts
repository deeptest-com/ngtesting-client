import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { CONSTANT } from '../../../../../utils/constant';

@Component({
  selector: 'issue-opt',
  templateUrl: './issue-opt.html',
  styleUrls: ['./styles.scss'],
})
export class IssueOpt implements OnInit, AfterViewInit {
  @Output() dealWithIssueEvent = new EventEmitter<any>();
  @Input() item: any;
  @Input() batchModel: boolean;
  issueTransMap: any;

  constructor() {
    this.issueTransMap = CONSTANT.ISU_TRANS_MAP;
  }

  ngOnInit(): any {

  }
  ngAfterViewInit() {
  }

  dealWithIssue(item, act): any {
    this.dealWithIssueEvent.emit({ act: act, item: item });
  }

  statusTran(item, tran) {
    this.dealWithIssueEvent.emit({ act: 'statusTran', item: item, tran: tran });
  }

}
