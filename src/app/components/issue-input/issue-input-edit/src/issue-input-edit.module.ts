import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { IssueInputEditComponent } from './issue-input-edit.component';

import { MyDateParserFormatter } from '../../../../service/my-date-parser-formatter';

export function myDateParserFormatterFactory() {
  return new MyDateParserFormatter('y-MM-dd');
}

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule],
  declarations: [IssueInputEditComponent],
  exports: [IssueInputEditComponent],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useFactory: myDateParserFormatterFactory,
    },
  ],
})
export class IssueInputEditModule {

}
