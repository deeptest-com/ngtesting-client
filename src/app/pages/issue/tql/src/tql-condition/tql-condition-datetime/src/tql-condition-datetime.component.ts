import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TqlConditionDatetimeService } from './tql-condition-datetime.service';

@Component({
  selector: 'tql-condition-datetime',
  templateUrl: './tql-condition-datetime.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionDatetimeComponent implements OnInit, AfterViewInit {
  @Input() filter: any;

  after: any = {};
  before: any = {};

  @Output() conditionChangeEvent = new EventEmitter<any>();

  hasChecked: boolean = false;
  init: boolean = true;

  constructor(private fb: FormBuilder,
              private tqlConditionDatetimeService: TqlConditionDatetimeService) {

  }

  ngOnInit(): any {
      // this.keywords = this._checkedItems ? this._checkedItems['keywords'] : '';
  }

  ngAfterViewInit() {

  }

  datetimeChange() {
    // this.conditionChangeEvent.emit({ code: this.model.code, keywords: this.keywords });
  }

  _apply() {
      // this.hasChecked = this.keywords != null && this.keywords != '';
  }

}
