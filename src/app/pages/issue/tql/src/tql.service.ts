
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../../../../service/request';

import { CONSTANT } from '../../../../utils/constant';
import { GlobalState } from '../../../../global.state';
import { RouteService } from '../../../../service/route';

@Injectable()
export class TqlService {
  _apiUrl = 'client/issue_tql/';
  _query = this._apiUrl + 'query';
  _queryById = this._apiUrl + 'queryById';
  _changeColumns = this._apiUrl + 'changeColumns';

  constructor(private _reqService: RequestService) {

  }

  changeColumns(columns: string) {
    return this._reqService.post(this._changeColumns, { columns: columns } );
  }

  query(rule: string, orderBy: any[], page: number, pageSize: number, init: boolean) {
    return this._reqService.post(this._query, { rule: rule, orderBy: orderBy,
      page: page, pageSize: pageSize, init: init } );
  }

  queryById(queryId: number, page: number, pageSize: number, init: boolean) {
    return this._reqService.post(this._queryById, { queryId: queryId,
      page: page, pageSize: pageSize, init: init } );
  }

  buildRule(rule: any, newRule: any): any {
    let found = false;
    for (const idx in rule.rules) {
      if (rule.rules[idx].id == newRule.id) {
        if (newRule.value || (newRule.group && newRule.rules && newRule.rules.length > 0)) {
          rule.rules[idx] = newRule; // 替换
        } else {
          rule.rules.splice(rule.rules.indexOf(rule.rules[idx]), 1); // 删除
        }

        found = true;
      }
    }

    if (!found && newRule != null) { // 没找到，加入
      rule.rules.push(newRule);
    }

    return rule;
  }

}

