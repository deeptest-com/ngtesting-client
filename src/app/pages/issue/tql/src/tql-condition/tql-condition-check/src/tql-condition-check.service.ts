import {Injectable} from '@angular/core';

import { TqlConditionService } from '../../tql-condition.service';

@Injectable()
export class TqlConditionCheckService {
  constructor(private tqlConditionService: TqlConditionService) {
  }

  getSelectedItemsFromRule(rule: any, code: string): any {
    if (!rule || !rule.rules) {
      return {};
    }

    const selecteds = {};
    for (let i = 0; i < rule.rules.length; i++) {
      const r = rule.rules[i];
      if (r.id == code) {
        if (r.operator === 'equal') {
          selecteds[r.value] = true;
        } else if (r.operator === 'in') {
          r.value.forEach((val: string) => {
            selecteds[val] = true;
          });
        }

        break;
      }
    }

    return selecteds;
  }

  newBasicRule(filter: any, options: any[]): any {
    let operator;
    let checkedVals = [];
    let ret;

    if (!filter.buildIn && this.tqlConditionService.mutiVal(filter.input)) {
      operator = 'contains';

      const children = [];
      options.forEach((option: any) => {
        if (option.checked) {
          // const val = filter.buildIn ? option.id : option.value;
          const val = option.id;

          const child = this.tqlConditionService.genRule( filter.code, filter.code, false, [],
            filter.input, filter.type, operator, val, filter.buildIn);
          children.push(child);
        }
      });

      ret = this.tqlConditionService.genGroupRule(filter.code, 'AND', children);

    } else {
      options.forEach((option: any) => {
        if (option.checked) {
          // const val = filter.buildIn ? option.id : option.value;
          const val = option.id;
          checkedVals.push(val);
        }
      });

      operator = checkedVals.length > 1 ? 'in' : 'equal';
      checkedVals = checkedVals.length > 0 ? checkedVals : null;
      ret = this.tqlConditionService.genRule( filter.code, filter.code, false, [],
        filter.input, filter.type, operator, checkedVals, filter.buildIn);

    }

    return ret;
  }

}

