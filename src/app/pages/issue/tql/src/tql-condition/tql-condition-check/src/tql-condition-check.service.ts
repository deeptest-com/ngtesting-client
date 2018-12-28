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

    console.log('LSDFLDSJF');
    if (!filter.buildIn && this.tqlConditionService.mutiVal(filter.input)) {
      operator = 'contains';

      let children = [];
      options.forEach((option: any) => {
        if (option.checked) {
          const val = filter.buildIn ? option.id : option.value;

          const child = this.genRule( filter.code, filter.code, false, [],
            filter.input, filter.type, operator, val);
          children.push(child);
        }
      });

      ret = this.genGroupRule(filter.code,'AND', children);

    } else {
      options.forEach((option: any) => {
        if (option.checked) {
          const val = filter.buildIn ? option.id : option.value;
          checkedVals.push(val);
        }
      });

      operator = checkedVals.length > 1 ? 'in' : 'equal';
      checkedVals = checkedVals.length > 0 ? checkedVals : null;
      ret = this.genRule( filter.code, filter.code, false, [],
        filter.input, filter.type, operator, checkedVals);

    }

    return ret;
  }

  genRule(id, field, group, rules, input, type, operator, value) {
    const ret: any = {
      id: id,
      field: field,
      group: group,
      rules: rules,
      input: input,
      type: type,

      operator: operator,
      value: value,
    };

    if (group) {
      ret.condition = 'OR';
    }

    return ret;
  }

  genGroupRule(id, condition, rules) {
    const ret: any = {
      id: id,
      group: true,
      condition: condition,
      rules: rules,
    };

    return ret;
  }
}

