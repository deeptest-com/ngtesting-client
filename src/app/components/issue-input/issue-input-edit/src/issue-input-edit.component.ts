import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


import {FormControl, FormGroup, Validators} from '@angular/forms';

import { Utils } from '../../../../utils/utils';

import * as _ from "lodash";

@Component({
  selector: 'issue-input-edit',
  templateUrl: './issue-input-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class IssueInputEditComponent implements OnInit, OnChanges {
  @Input() elem: any = {};
  @Input() issuePropMap: any = {};
  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Output() propEvent = new EventEmitter<any>();

  _issue: any = {};
  get issue(): any {
    return this._issue;
  }
  @Input('issue')
  set issue(value: any) {
    this._issue = value;

    if (this.elem.input == 'time') {
      if (!this._issue[this.elem.code]) {
        this._issue[this.elem.code] = Utils.timeStructFromStr('10:00:00');
      } else {
        this._issue[this.elem.code] = Utils.timeStructFromStr(this._issue[this.elem.code]);
      }
    }

    if (this.elem.input == 'date') {
      console.log('2222222', this._issue[this.elem.code]);
      this._issue[this.elem.code] = this.ngbDateParserFormatter.parse(this._issue[this.elem.code]);
    }
  }

  labelColNum: number = 4;
  startDate: any;

  public constructor(config: NgbTimepickerConfig, private ngbDateParserFormatter: NgbDateParserFormatter) {
    config.seconds = true;
    config.spinners = false;

    const now = new Date();
    this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  }

  public ngOnInit(): void {
    if (!this._issue[this.elem.code] && this.issuePropMap[this.elem.code]) {
      const defaults: any[] = this.issuePropMap[this.elem.code].filter(
        (option, index) => option.isDefault == true);
      if (defaults.length > 0) {
        this._issue[this.elem.code] = defaults[0].id;
      }
    }

    const validators: any[] = [];
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

}
