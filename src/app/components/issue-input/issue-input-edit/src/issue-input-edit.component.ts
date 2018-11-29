import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { NgbDatepicker, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'issue-input-edit',
  templateUrl: './issue-input-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class IssueInputEditComponent implements OnInit, OnChanges {
  @Input() issue: any = {};
  @Input() elem: any = {};
  @Input() issuePropMap: any = {};
  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Output() propEvent = new EventEmitter<any>();

  @ViewChildren('datepicker') datepickers: NgbDatepicker;

  labelColNum: number = 4;
  startDate: any;

  public constructor(config: NgbTimepickerConfig) {
    config.seconds = true;
    config.spinners = false;

    const now = new Date();
    this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  }

  public ngOnInit(): void {
    if (!this.issue[this.elem.code] && this.issuePropMap[this.elem.code]) {
      const defaults: any[] = this.issuePropMap[this.elem.code].filter(
        (option, index) => option.isDefault == true);
      if (defaults.length > 0) {
        this.issue[this.elem.code] = defaults[0].id;
      }
    }

    let validators: any[] = [];
    if (this.elem.required) {
      validators.push(Validators.required);
      this.validateMsg['elem-' + this.elem.id] = {
        'required': this.elem.label + '不能为空',
      };
    }
    this.form.addControl('elem-' + this.elem.id,
      new FormControl({ value: '', disabled: this.elem.readonly }, validators));
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public getCol(): number {
    if (this.elem.fullLine) {
      this.labelColNum = 2;
    } else {
      this.labelColNum = 4;
    }
    return this.labelColNum;
  }

  clickDatepicker() {
    console.log('datepicker', this.datepickers);

    this.datepickers[0].toggle();
  }

}
