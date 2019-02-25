import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'mapToArray' })
export class MapToArrayPipe implements PipeTransform {
  transform(map: any, ignore: string[]): any {
    // console.log('***', map);

    if (!_.isArray(ignore)) {
      ignore = _.union([], [ignore]);
    }

    const keys: Array<any> = [];

    for (const key in map) {
      keys.push({ key: key, value: map[key] });
    }
    return keys;
  }
}
