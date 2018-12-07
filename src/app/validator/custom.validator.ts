import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

import { Utils, logger } from '../utils/utils';

export let CustomValidator: any = {
  validate: function (...params: string[]): ValidatorFn {
    return (c: FormGroup): {[key: string]: any} => {

      if (!c.parent) {
        return null;
      }

      const result = {};
      let pass = true;

      const name = params[0];
      const msgKey = params[1];
      if (name === 'required_if_other_is') {
        const thisField = params[2];
        const otherFiled = params[3];
        const value = params[4];
        pass = this.required_if_other_is(c.parent, thisField, otherFiled, value);
      }

      if (!pass) {
        result[msgKey] = {
          valid: false,
        };
        return result;
      } else {
        return null;
      }
    };
  },

  required_if_other_is: function (group: FormGroup, thisField: string, otherFiled: string, value: string): boolean {
    if (group.controls && group.controls[otherFiled].value === value) {
      const val = group.controls[thisField].value;
      if (!val || val === '') {
        return false;
      }
    }
    return true;
  },

  compareDate: function (resultKey: string, startTime: string, endTime: string): ValidatorFn {
    return (c: FormGroup) => {
      const fail = false;

      const start = c.controls[startTime];
      const end = c.controls[endTime];

      if (!start.value || !end.value) {
        start.setErrors(null);
        end.setErrors(null);
        return null;
      }

      const startDate = Utils.strToTimestamp(start.value);
      const endDate = Utils.strToTimestamp(end.value);

      const pass = startDate <= endDate;

      if (!pass) {
        logger.log('compareDate fail');

        start.setErrors({});
        end.setErrors({});

        const ret = {};
        ret[resultKey] = {
          valid: false,
        };
        return ret;
      } else {
        start.setErrors(null);
        end.setErrors(null);

        return null;
      }
    } ;
  },
};
