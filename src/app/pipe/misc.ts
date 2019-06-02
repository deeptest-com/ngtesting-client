import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'pathToLink' })
export class PathToLinkPipe implements PipeTransform {
  transform(path: any, name: string): string {
    return CONSTANT.SERVICE_URL + CONSTANT.DOWNLOAD_URI + '?path=' + path + '&name=' + name;
  }
}

@Pipe({ name: 'term' })
export class TermPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(str: string) {
    if (!str) {
      return '<span></span>';
    }
    return this.sanitized.bypassSecurityTrustHtml('<span style="font-weight: bolder">' + str + '</span>');
  }
}

@Pipe({ name: 'section' })
export class SectionPipe implements PipeTransform {
  constructor() {}
  transform(str: string, index: number, separator: string = '-') {
    const arr = str.split(separator);
    return arr[index];
  }
}
