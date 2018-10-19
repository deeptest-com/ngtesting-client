
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
  _changeColumns = this._apiUrl + 'changeColumns';

  constructor(private _reqService: RequestService) {

  }

  changeColumns(columns: string) {
    return this._reqService.post(this._changeColumns, { columns: columns } );
  }

  query(rule: string, page: number, pageSize: number, init: boolean) {
    return this._reqService.post(this._query, { rule: rule,
      page: page, pageSize: pageSize, init: init } );
  }

  basicJqlToMap(rule: any): any {
    const ret = {};

    rule.rules.forEach((r: any) => {
      const selecteds = {};
      if (r.operator === 'equal') {
        selecteds[r.value] = true;
      } else if (r.operator === 'in') {
        r.value.forEach((val: string) => {
          selecteds[val] = true;
        });
      }
      ret[r.id] = selecteds;
    });
    return ret;
  }

  buildRule(rule: any, filters: any[], condition: any): any {
    const filter = filters.filter((elem, index) => elem.id == condition.id)[0];
    const r = this.newBasicRule(filter, condition.options);
    console.log('filter', filter, r);

    let replace = false;
    for (const idx in rule.rules) {
      console.log('r=', rule.rules[idx]);
      if (rule.rules[idx].id == condition.id) {
        if (r) {
          rule.rules[idx] = r;
        } else {
          rule.rules.splice(rule.rules.indexOf(rule.rules[idx]), 1);
        }

        replace = true;
      }
    }

    if (!replace && r != null) {
      rule.rules.push(r);
    }

    return rule;
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

