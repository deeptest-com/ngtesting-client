import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbDateParserFormatter, NgbTimepickerModule, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { IssueInputEditComponent } from './issue-input-edit.component';

import { MyDateParserFormatter } from '../../../../service/my-date-parser-formatter';

export function myDateParserFormatterFactory() {
  return new MyDateParserFormatter('yyyy-MM-dd');
}

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,
    NgbDatepickerModule, NgbTimepickerModule],
  declarations: [IssueInputEditComponent],
  exports: [IssueInputEditComponent],
  providers: [NgbTimepickerConfig,
    {
      provide: NgbDateParserFormatter,
      useFactory: myDateParserFormatterFactory,
    },
  ],
})
export class IssueInputEditModule {

}
