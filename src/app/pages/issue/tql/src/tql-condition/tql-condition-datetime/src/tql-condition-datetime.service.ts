import { Injectable } from '@angular/core';

import { DateUtils } from '../../../../../../../utils/utils';
import { TqlConditionService } from '../../tql-condition.service';

@Injectable()
export class TqlConditionDatetimeService {

  constructor(private tqlConditionService: TqlConditionService) {

  }

  newBasicRule(filter: any, from: any, to: any): any {
    let operator;
    const children = [];

    console.log('LSDFLDSJF');

    let fromRule;
    let toRule;

    if (from) {
      fromRule = this.tqlConditionService.genRule(filter.code, filter.code, false, [],
        filter.input, filter.type, 'greater_or_equal', DateUtils.firstSecOfDay(from));
      children.push(fromRule);
    }

    if (to) {
      toRule = this.tqlConditionService.genRule(filter.code, filter.code, false, [],
        filter.input, filter.type, 'less_or_equal', DateUtils.lastSecOfDay(to));
      children.push(toRule);
    }

    let ret;
    if (children.length > 0) {
      ret = this.tqlConditionService.genGroupRule(filter.code, 'AND', children);
    } else {
      ret = this.tqlConditionService.genRule(filter.code, filter.code, false, [],
        filter.input, filter.type, '', null);
    }

    return ret;
  }

}

