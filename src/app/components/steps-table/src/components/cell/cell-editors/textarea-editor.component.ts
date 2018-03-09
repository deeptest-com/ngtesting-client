import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'textarea-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <textarea id="test-step-input" class="form-control" maxlength="9999"
              [(ngModel)]="cell.newValue"
              [name]="cell.getId()"
              [disabled]="!cell.isEditable()"
              [placeholder]="cell.getTitle()">
    </textarea>
    `,
})
export class TextareaEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}
