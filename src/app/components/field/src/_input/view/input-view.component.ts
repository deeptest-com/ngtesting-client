import { Input, Component, OnInit, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from '../../../../../utils/utils';
import { DateFormatPipe } from '../../../../../pipe/date';

import * as _ from 'lodash';
import { CONSTANT } from '../../../../../utils';

declare var jQuery;

@Component({
  selector: 'input-view',
  templateUrl: './input-view.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class InputViewComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Input() elem: any = {};
  @Input() modelType: string;
  propValMap: any;

  val: any;
  init: boolean = true;

  _model: any = {};
  @Input() set model(value) {
    this._model = value;
    if (!this.init) { // 负责更新，初始化由ngOnInit完成
      this.val = this.getLabel();
    }
  }

  public constructor(private dateFormat: DateFormatPipe) {

  }

  public ngOnInit(): void {
    this.propValMap = this.modelType == 'case' ? CONSTANT.CASE_PROPERTY_VAL_MAP : CONSTANT.ISU_PROPERTY_VAL_MAP;
    this.val = this.getLabel();
    this.init = false;
  }

  getLabel() {
    // console.log(this.elem, this._model);

    const code = this.elem.colCode;
    let val = this._model[code];

    if (this.elem.input == 'dropdown') { // buildIn只有一种选项控件
      return this.propValMap[code][val];
    } else if (this.elem.input == 'date') {
      return this.dateFormat.transform(val, 'yyyy-mm-dd');
    } else if (this.elem.input == 'datetime') {
      return this.dateFormat.transform(val, 'yyyy-mm-dd hh:mm');
    }

    if (code == 'title') {
      val = 'IS-' + this._model.id + ' ' + val;
    }

    return val;
  }

  ngAfterViewInit() {

  }

}
