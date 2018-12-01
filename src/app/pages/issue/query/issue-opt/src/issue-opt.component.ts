import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../../utils/constant';

@Component({
  selector: 'issue-opt',
  templateUrl: './issue-opt.html',
  styleUrls: ['./styles.scss'],
})
export class IssueOpt implements OnInit, AfterViewInit {
  form: FormGroup;

  @Output() dealWithIssueEvent = new EventEmitter<any>();

  @Input() item: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): any {

  }
  ngAfterViewInit() {
  }

  dealWithIssue(item, act): any {
    this.dealWithIssueEvent.emit({ act: act, item: item });
  }

}
