import { Input, Component, OnInit, AfterViewInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from '../../../../../utils/utils';
import { DateFormatPipe } from '../../../../../pipe/date';

import * as _ from 'lodash';

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
  @Input() model: any = {};
  @Input() propValMap: any = {};

  public constructor() {

  }

  public ngOnInit(): void {

  }

  getLabel() {
    console.log(this.elem, this.model);

    const code = this.elem.colCode;
    let val = this.model[code];

    if (this.elem.buildIn && this.elem.input == 'dropdown') { // buildIn只有一种选项控件
      return this.propValMap[code][val];
    }

    if (code == 'title') {
      val = 'IS-' + this.model.id + ' ' + val;
    }

    return val;
  }

  ngAfterViewInit() {

  }

}
