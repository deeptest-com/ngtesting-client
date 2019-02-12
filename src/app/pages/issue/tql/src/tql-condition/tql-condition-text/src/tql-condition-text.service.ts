import {Injectable} from '@angular/core';

import {TqlConditionService} from '../../tql-condition.service';

@Injectable()
export class TqlConditionTextService {

  constructor(private _tqlConditionService: TqlConditionService) {

  }

  newBasicRule(filter: any, keywords: string): any {
    console.log(filter, keywords);

    const operator = this._tqlConditionService.textOpt(filter.input);
    const value = keywords ? keywords : null;

    return {
      id: filter.code,
      field: filter.code,
      group: false,
      rules: [],
      input: filter.input,
      type: filter.type,
      buildIn: filter.buildIn,

      operator: operator,
      value: value,
    };
  }
}

