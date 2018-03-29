import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';

@Pipe({ name: 'show_if_contains' })
export class ShowIfContainsPipe implements PipeTransform {
    transform(list: any[], obj: any, prop?: any): string {
      let found = 'hidden';
      for (const item of list) {
        if (!prop) {
          if (item == obj) {
            found = '';
            break;
          }
        } else {
          if (item.prop == obj) {
            found = '';
            break;
          }
        }
      }

      return found;
    }
}
