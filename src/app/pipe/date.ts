import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'timePassed' })
export class TimePassedPipe implements PipeTransform {
  transform(timestamp: any): string {
    return this.timePassed(timestamp);
  }

  timePassed(timestamp: any, local = 'en-US', format = 'y/MM/dd HH:mm') {
    const now = new Date().getTime();
    const diffValue = now - timestamp;
    let result = '';
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const _day = diffValue / day;
    const _hour = diffValue / hour;
    const _min = diffValue / minute;

    if (_day > 7) {
      result = new DatePipe(local).transform(timestamp, format);
    } else if (_day >= 1) {
      result = parseInt(_day + '') + '天前';
    } else if (_hour >= 1) {
      result = parseInt(_hour + '') + '个小时前';
    } else if (_min >= 1) {
      result = parseInt(_min + '') + '分钟前';
    } else {
      result = '刚刚';
    }
    return result;
  }
}

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, format: string = 'yyyy-MM-dd'): any {
    return super.transform(value, format);
  }
}
