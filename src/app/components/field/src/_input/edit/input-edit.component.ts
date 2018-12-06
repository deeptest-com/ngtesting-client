import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { NgbDateParserFormatter, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from '../../../../../utils/utils';

import * as _ from 'lodash';

@Component({
  selector: 'input-edit',
  templateUrl: './input-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class InputEditComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  @Input() validateMsg: any = {};
  startDate: any;

  @Input() elem: any = {};
  @Input() options: any[] = [];
  _model: any = {};

  get model(): any {
    return this._model;
  }
  @Input('model')
  set model(value: any) {
    this._model = value;

    if (this.elem.input == 'time') {
      if (!this._model[this.elem.code]) {
        this._model[this.elem.code] = Utils.timeStructFromStr('10:00:00');
      } else {
        this._model[this.elem.code] = Utils.timeStructFromStr(this._model[this.elem.code]);
      }
    } else if (this.elem.input == 'date') {
      this._model[this.elem.code] = this.ngbDateParserFormatter.parse(this._model[this.elem.code]);
    }
  }

  public constructor(config: NgbTimepickerConfig, private ngbDateParserFormatter: NgbDateParserFormatter) {
    if (this.elem.input == 'time') {
      config.seconds = true;
      config.spinners = false;
    } else if (this.elem.input == 'date') {
      const now = new Date();
      this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
    }
  }

  public ngOnInit(): void {

    console.log('dksjfdsjf', this.elem, this._model);

    if (this.options) {
      const defaults: any[] = this.options.filter(
        (option, index) => option.isDefault == true);
      if (defaults.length > 0) {
        this._model[this.elem.code] = defaults[0].id;
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

  getVal(elem, option) {
    if (elem.buildIn) {
      return option.id;
    } else {
      return option.value;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

}
