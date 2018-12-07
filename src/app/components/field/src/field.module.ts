import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DateFormatPipe } from '../../../pipe/date';

import { LabelShowComponent } from './_label/show/label-show.component';
import { LabelIssueDesignComponent } from './_label/issue/design/label-issue-design.component';

import { InputEditComponent } from './_input/edit/input-edit.component';
import { InputViewComponent } from './_input/view/input-view.component';
import { InputDesignComponent } from './_input/design/input-design.component';

import { IssueFieldDesignComponent } from './field/issue/design/issue-field-design.component';
import { IssueFieldEditComponent } from './field/issue/edit/issue-field-edit.component';

import { CaseFieldEditComponent } from './field/case/edit/case-field-edit.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule,
    ],
  declarations: [
    LabelShowComponent, LabelIssueDesignComponent,
    InputEditComponent, InputViewComponent, InputDesignComponent,

    IssueFieldDesignComponent, IssueFieldEditComponent,
    CaseFieldEditComponent,
  ],
  exports: [
    LabelShowComponent, LabelIssueDesignComponent,
    InputEditComponent, InputViewComponent, InputDesignComponent,

    IssueFieldDesignComponent, IssueFieldEditComponent,
    CaseFieldEditComponent,
  ],
  providers: [DateFormatPipe],
})
export class FieldModule {

}
