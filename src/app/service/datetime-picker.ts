import * as _ from 'lodash';

import { Injectable } from '@angular/core';

declare var jQuery;

@Injectable()
export class DatetimePickerService {
   constructor() { }

   DateOptions = {
      language: 'zh-CN',
      format: 'yyyy-mm-dd',
      startDate: '+1d',
      autoclose: true,
  };

  TimeOptions = {
      showMeridian: false,
      minuteStep: 30,
      icons: { up: 'fa fa-chevron-up', down: 'fa fa-chevron-down' },
  };

  genDatePicker(model: string, name: string) {
      const that = this;

      const picker = jQuery('input[formcontrolname="' + name + '"]').parent();
      picker.datepicker(that.DateOptions);
      picker.on('changeDate', function() {
        if (!!picker.datepicker('getFormattedDate')) {
            model[name] = picker.datepicker('getFormattedDate');
        }
      });
      picker.on('hide', function() {
        if (!picker.datepicker('getFormattedDate')) {
            picker.datepicker('setDate', model[name]);
        }
          console.log(model);
      });
  }

  genTimePicker(model, name) {
    const that = this;
    if (!model[name]) {
      model.signBefore = 3;

      const time = name.indexOf('ndTime') < 0 ? '10:00' : '17:00';
      model[name] = time;
    }

      const picker = jQuery('.input-group.timepicker > input[name="' + name + '"]');
      picker.timepicker(that.TimeOptions);

      picker.on('changeTime.timepicker', function(e: any) {
        model[name] = e.time.value;
      });
  }

}
