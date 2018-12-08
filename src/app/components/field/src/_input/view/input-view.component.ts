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
  @Input('model') model: any = {};

  public constructor() {

  }

  public ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

}
