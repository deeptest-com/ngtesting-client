import { Input, Component, OnInit, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from '../../../../../utils/utils';
import { DateFormatPipe } from '../../../../../pipe/date';

import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: 'input-edit',
  templateUrl: './input-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class InputEditComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Input() elem: any = {};
  @Input() options: any[] = [];

  mutiSelectVal: any[] = [];
  checkboxVal: any = {};

  _model: any = {};

  get model(): any {
    return this._model;
  }
  @Input('model')
  set model(value: any) {
    this._model = value;

    if (this.elem.input == 'date') {
      this._model[this.elem.colCode] = this._dateFormatPipe.transform(this._model[this.elem.colCode]);
    } else if (this.elem.input == 'time') {
      this._model[this.elem.colCode] = this._dateFormatPipe.transform(
        this._model[this.elem.colCode], 'HH:mm');
    } else if (this.elem.input == 'datetime') {
      this._model[this.elem.colCode] = this._dateFormatPipe.transform(
        this._model[this.elem.colCode], 'yyyy-MM-dd HH:mm');
    }
    else if (this.elem.input == 'multi_select' && this._model[this.elem.colCode]) {
      this.mutiSelectVal = this._model[this.elem.colCode].split(',');
    } else if (this.elem.input == 'checkbox' && this._model[this.elem.colCode]) {
      this._model[this.elem.colCode].split(',').forEach(item => {
        this.checkboxVal[item] = true;
      });
    }

    console.log('###', this.mutiSelectVal, this.checkboxVal);
  }

  public constructor(private _dateFormatPipe: DateFormatPipe) {

  }

  public ngOnInit(): void {
    if (!this._model[this.elem.colCode] && this.options) {
      const defaults: any[] = this.options.filter(
        (option, index) => option.defaultVal == true);
      if (defaults.length > 0) {
        this._model[this.elem.colCode] = this.elem.buildIn ? defaults[0].id : defaults[0].value;
      }
    }

    const validators: any[] = [];
    if (this.elem.required) {
      validators.push(Validators.required);
      this.validateMsg['elem-' + this.elem.id] = { 'required': this.elem.label + '不能为空' };
    }
    if (this.elem.input == 'number') {
      if (this.elem.type == 'integer') {
        validators.push(Validators.pattern('^[0-9]*$'));
        this.validateMsg['elem-' + this.elem.id] = { 'pattern': this.elem.label + '必须是整数' };
      } else if (this.elem.type == 'double') {
        validators.push(Validators.pattern('^(-?\\d+)(\\.\\d+)?$'));
        this.validateMsg['elem-' + this.elem.id] = { 'pattern': this.elem.label + '必须是小数' };
      }
    }

    this.form.addControl('elem-' + this.elem.id,
      new FormControl({ value: '', disabled: this.elem.readonly }, validators));
  }

  ngAfterViewInit() {
    jQuery('.my-flatpickr-date').flatpickr({ wrap: true });

    jQuery('.my-flatpickr-time').flatpickr({
      wrap: true,
      enableTime: true,
      noCalendar: true,
      time_24hr: true,
      minuteIncrement: 15,
    });

    jQuery('.my-flatpickr-datetime').flatpickr({
      wrap: true,
      enableTime: true,
      time_24hr: true,
      minuteIncrement: 15,
    });
  }

  checkboxValChange() {
    let val: any[] = [];
    for (const key in this.checkboxVal) {
      if (this.checkboxVal[key]) {
        val.push(key);
      }
    }
    this.model[this.elem.colCode] = val.join(',');

    console.log('checkboxValChange', this.model[this.elem.colCode]);
  }

  mutiSelectValChange() {
    this.model[this.elem.colCode] = this.mutiSelectVal.join(',');
    console.log('mutiSelectValChange', this.model[this.elem.colCode]);
  }

  richtextChange(content: any) {
    this.model[this.elem.colCode] = content;
    console.log('richtextChange', this.model[this.elem.colCode]);
  }

  getVal(elem, option) {
    if (elem.buildIn) {
      return option.id;
    } else {
      return option.value;
    }
  }

}
