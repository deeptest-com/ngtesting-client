import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';

@Pipe({ name: 'pathToLink' })
export class PathToLinkPipe implements PipeTransform {
  transform(path: any): string {
    return CONSTANT.SERVICE_URL + path;
  }
}
