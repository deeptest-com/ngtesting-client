import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'input-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <input class="form-control" maxlength="255"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()">
    `,
})
export class InputEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}
