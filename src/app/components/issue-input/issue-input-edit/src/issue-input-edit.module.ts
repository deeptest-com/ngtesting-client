import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IssueInputEditComponent } from './issue-input-edit.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
  declarations: [IssueInputEditComponent],
  exports: [IssueInputEditComponent],
  providers: [],
})
export class IssueInputEditModule {

}
