import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class MyToastyService {

  TOAST_OPTIONS: any = {
    timeout: 2000,
    theme: 'material',
    position: 'bottom-right',
    // type: 'toasty-type-default'
  };

  constructor(private toastyService: ToastyService) {

  }

  info(option: any) {
    _.merge(option, this.TOAST_OPTIONS);
    this.toastyService.info(option);
  }

  success(option: any) {
    _.merge(option, this.TOAST_OPTIONS);
    this.toastyService.success(option);
  }

  warning(option: any) {
    _.merge(option, this.TOAST_OPTIONS);
    this.toastyService.warning(option);
  }

  error(option: any) {
    _.merge(option, this.TOAST_OPTIONS);
    this.toastyService.error(option);
  }
}

