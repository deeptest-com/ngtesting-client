import { Input, Component, OnInit, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from '../../../../../utils/utils';

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
  _model: any = {};

  get model(): any {
    return this._model;
  }
  @Input('model')
  set model(value: any) {
    this._model = value;
  }

  public constructor() {

  }

  public ngOnInit(): void {

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

  ngAfterViewInit() {
    jQuery('.my-flatpickr-date').flatpickr({});
    jQuery('.my-flatpickr-time').flatpickr({});
    jQuery('.my-flatpickr-datetime').flatpickr({});
  }

  getVal(elem, option) {
    if (elem.buildIn) {
      return option.id;
    } else {
      return option.value;
    }
  }

}
