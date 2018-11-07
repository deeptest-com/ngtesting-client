import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'pathToLink' })
export class PathToLinkPipe implements PipeTransform {
  transform(path: any): string {
    return CONSTANT.SERVICE_URL + path;
  }
}

@Pipe({ name: 'term' })
export class TermPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(str: string) {
    return this.sanitized.bypassSecurityTrustHtml('<span style="font-weight: bolder">「' + str + '」</span>');
  }
}
