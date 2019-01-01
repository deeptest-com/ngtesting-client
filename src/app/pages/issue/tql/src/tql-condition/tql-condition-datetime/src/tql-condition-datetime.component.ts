import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { DateFormatPipe } from '../../../../../../../pipe/date';

import { TqlConditionDatetimeService } from './tql-condition-datetime.service';
import {CONSTANT} from "../../../../../../../utils";

@Component({
  selector: 'tql-condition-datetime',
  templateUrl: './tql-condition-datetime.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionDatetimeComponent implements OnInit, AfterViewInit {
  @Input() rule: any = {};
  @Input() filter: any = {};

  from: any = null;
  to: any = null;

  @Output() conditionChangeEvent = new EventEmitter<any>();

  hasChecked: boolean = false;
  init: boolean = true;

  constructor(private fb: FormBuilder, private _dateFormatPipe: DateFormatPipe,
              private tqlConditionDatetimeService: TqlConditionDatetimeService) {

  }

  ngOnInit(): any {
    this.from = this._dateFormatPipe.transform(this.from);
    this.to = this._dateFormatPipe.transform(this.to);
  }

  ngAfterViewInit() {
    const fromInput = jQuery('.my-flatpickr-date-from').flatpickr({ wrap: true, minDate: 'today', dateFormat: 'Y-m-d' ,
      onChange: (selectedDates, dateStr, instance) => {
      console.log('FROM', selectedDates[0]);
        this.from = selectedDates[0];
        this.datetimeChange();
      },
    });
    const toInput = jQuery('.my-flatpickr-date-to').flatpickr({ wrap: true, minDate: 'today', dateFormat: 'Y-m-d' ,
      onChange: (selectedDates, dateStr, instance) => {
        this.to = selectedDates[0];
        this.datetimeChange();
      },
    });

    const data = this.tqlConditionDatetimeService.getDatesFromRule(this.rule, this.filter);
    this.from = data.from;
    this.to = data.to;

    fromInput.setDate(this.from);
    toInput.setDate(this.to);
  }

  datetimeChange() {
    const newRule = this.tqlConditionDatetimeService.newBasicRule(this.filter, this.from, this.to);
    this.conditionChangeEvent.emit(newRule);

    this.computerIfFilterIsWork();
  }

  computerIfFilterIsWork() {
    this.hasChecked = !!this.from && !!this.to;
  }

}
