
import { Injectable } from '@angular/core';

@Injectable()
export class TqlConditionService {
  constructor() {

  }

  genRule(id, field, group, rules, input, type, operator, value, buildIn) {
    const ret: any = {
      id: id,
      field: field,
      group: group,
      rules: rules,
      input: input,
      type: type,
      buildIn: buildIn,

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

  ui(input) {
    if (input == 'dropdown' || input == 'multi_select' || input == 'radio' || input == 'checkbox') {
      return 'select';
    } else if (input == 'number' || input == 'text' || input == 'textarea' || input == 'richtext') {
      return 'text';
    } else if (input == 'date' || input == 'time' || input == 'datetime') {
      return 'datetime';
    }
  }

  textOpt(input) {
    if (input == 'number') {
      return 'equal';
    } else if (input == 'text' || input == 'textarea' || input == 'richtext') {
      return 'contains';
    }
  }

  mutiVal(input) {
    return input == 'multi_select' || input == 'checkbox';
  }

}

