import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'field-show-value',
  styleUrls: ['./value.scss'],
  templateUrl: './field-show-value.html',
})
export class FieldShowValueComponent {

  @Input() model: any = {};
  @Input() prop: string;
  @Input() valType: string;
  @Input() valFormat: string;

  public constructor() {

  }

}
