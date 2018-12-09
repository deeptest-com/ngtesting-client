import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';

@Pipe({ name: 'fieldApplyTo' })
export class FieldApplyToPipe implements PipeTransform {
  map: any = CONSTANT.FieldApplyTo;

  transform(s: string): string {
    return this.map[s];
  }
}

@Pipe({ name: 'fieldFormat' })
export class FieldFormatPipe implements PipeTransform {
  map: any = CONSTANT.FieldFormat;

  transform(s: string): string {
    if (!s) {
      return 'N/A';
    }
    return this.map[s];
  }
}

@Pipe({ name: 'trueOrFalse' })
export class TrueOrFalsePipe implements PipeTransform {
  map: any = CONSTANT.TrueOrFalse;

  transform(b: boolean): string {
    if (!b) {
      return '否';
    }

    return this.map['' + b];
  }
}

@Pipe({ name: 'disableOrNot' })
export class DisableOrNotPipe implements PipeTransform {
  map: any = CONSTANT.DisableOrNot;

  transform(disabled: boolean): string {
    return this.map['' + disabled];
  }
}

@Pipe({ name: 'caseExeStatus' })
export class CaseExeStatusPipe implements PipeTransform {
  map: any = CONSTANT.CaseExeStatus;

  transform(disabled: boolean): string {
    return this.map['' + disabled];
  }
}
