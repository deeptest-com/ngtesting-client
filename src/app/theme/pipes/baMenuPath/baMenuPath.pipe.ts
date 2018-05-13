import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';

@Pipe({ name: 'baMenuPath' })
export class baMenuPath implements PipeTransform {
  transform(input: string[]): string[] {
    let arr: string[] = [];
    input.forEach((path: string) => {
      if (path == '/' || path.indexOf('/') < 0) {
        arr.push(path);
      } else {
        arr = arr.concat(path.split('/'));
      }
    });
    return arr;
  }
}
