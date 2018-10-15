
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../../../service/request';

import { CONSTANT } from '../../../../utils/constant';
import { GlobalState } from '../../../../global.state';
import { RouteService } from '../../../../service/route';

@Injectable()
export class TqlService {
  _apiUrl = 'client/tql/';
  _query = this._apiUrl + 'query';

  constructor(private _reqService: RequestService) {

  }

  query(jql: string, init: boolean) {
    return this._reqService.post(this._query, { jql: jql, init: init } );
  }

  basicJqlToMap(jql: any): any {
    const ret = {};

    jql.rules.forEach((rule: any) => {
      const selecteds = {};
      if (rule.operator === 'equal') {
        selecteds[rule.value] = true;
      } else if (rule.operator === 'in') {
        rule.value.forEach((val: string) => {
          selecteds[val] = true;
        });
      }
      ret[rule.id] = selecteds;
    });
    return ret;
  }

  buildJql(jql: any, filters: any[], condition: any): any {
    const filter = filters.filter((elem, index) => elem.id == condition.id)[0];
    const rule = this.newBasicRule(filter, condition.options);
    console.log('filter', filter, rule);

    let replace = false;
    for (const idx in jql.rules) {
      console.log('r=', jql.rules[idx]);
      if (jql.rules[idx].id == condition.id) {
        if (rule) {
          jql.rules[idx] = rule;
        } else {
          jql.rules.splice(jql.rules.indexOf(jql.rules[idx]), 1);
        }

        replace = true;
      }
    }

    if (!replace && rule != null) {
      jql.rules.push(rule);
    }

    return jql;
  }

  newBasicRule(filter: any, options: any[]): any {
    const checkedVals = [];

    options.forEach((option: any) => {
      if (option.checked) {
        checkedVals.push(option.key);
      }
    });

    if (checkedVals.length == 0) {
      return null;
    } else {
      console.log('=====', checkedVals);
      return {
        id: filter.id,
        field: filter.id,
        group: false,
        rules: [],

        input: filter.input,
        operator: checkedVals.length == 0 ? 'equal' : 'in',
        type: filter.type,
        value: checkedVals,
      };
    }
  }

}

