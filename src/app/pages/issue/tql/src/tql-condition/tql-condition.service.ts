
import { Injectable } from '@angular/core';

@Injectable()
export class TqlConditionService {
  constructor() {

  }

  uiSelect(input) {
    return input == 'dropdown' || input == 'multi_select' || input == 'radio' || input == 'checkbox';
  }

  uiText(input) {
    return input == 'number' || input == 'text' || input == 'textarea' || input == 'richtext';
  }
  textOpt(input) {
    if (input == 'number') {
      return 'equal';
    } else if (input == 'text' || input == 'textarea' || input == 'richtext') {
      return 'contains';
    }
  }

  uiDatetime(input) {
    return input == 'date' || input == 'time' || input == 'datetime';
  }

  mutiVal(input) {
    return input == 'multi_select' || input == 'checkbox';
  }

}

