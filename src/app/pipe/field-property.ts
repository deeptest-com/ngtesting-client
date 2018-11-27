import { Pipe, PipeTransform } from '@angular/core';

import { CONSTANT } from '../utils/constant';

@Pipe({ name: 'fieldType' })
export class FieldTypePipe implements PipeTransform {

  map: any = {'string': '字符串', 'integer': '整数', 'doublee': '浮点数',
              'date': '日期', 'time': '时间', 'datetime': '日期时间',
              'booleann': '布尔值',
             };

  transform(s: string) : string {
      return this.map[s];
  }
}

@Pipe({ name: 'fieldInput' })
export class FieldInputPipe implements PipeTransform {
  map: any = {'text': '文本', 'number': '数字', 'textarea': '多行文本', 'date': '日期',
    'radio': '单选按钮', 'checkbox': '多选框', 'dropdown': '下拉菜单',
    'url': '网址', 'user': '用户', 'version': '版本', 'environment': '环境',
  };

  transform(s: string) : string {
    return this.map[s];
  }
}

@Pipe({ name: 'fieldApplyTo' })
export class FieldApplyToPipe implements PipeTransform {
  map: any = { 'test_case': '测试用例', 'test_result': '测试结果' };

  transform(s: string) : string {
    return this.map[s];
  }
}

@Pipe({ name: 'fieldFormat' })
export class FieldFormatPipe implements PipeTransform {
  map: any = { 'rich_text': '富文本', 'plain_text': '纯文本' };

  transform(s: string) : string {
    if (!s) {
      return 'N/A';
    }
    return this.map[s];
  }
}

@Pipe({ name: 'trueOrFalse' })
export class TrueOrFalsePipe implements PipeTransform {
  map: any = { 'true': '是', 'false': '否' };

  transform(b: boolean) : string {
    if (!b) {
      return '否';
    }

    return this.map['' + b];
  }
}

@Pipe({ name: 'disableOrNot' })
export class DisableOrNotPipe implements PipeTransform {
  map: any = { 'true': '禁用', 'false': '启动' };

  transform(disabled: boolean) : string {
    return this.map['' + disabled];
  }
}
