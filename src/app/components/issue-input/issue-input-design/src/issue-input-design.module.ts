import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDatepickerModule, NgbDateParserFormatter, NgbTimepickerModule, NgbTimepickerConfig }
  from '@ng-bootstrap/ng-bootstrap';

import { MyDateParserFormatter } from '../../../../service/my-date-parser-formatter';

import { IssueInputDesignComponent } from './issue-input-design.component';
import { myDateParserFormatterFactory } from '../../issue-input-edit/src/issue-input-edit.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,
    NgbDatepickerModule, NgbTimepickerModule],
  declarations: [IssueInputDesignComponent],
  exports: [IssueInputDesignComponent],
  providers: [NgbTimepickerConfig,
    {
      provide: NgbDateParserFormatter,
      useFactory: myDateParserFormatterFactory,
    },
  ],
})
export class IssueInputDesignModule {

}
