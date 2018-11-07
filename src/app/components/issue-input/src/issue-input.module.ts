import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IssueInputComponent } from './issue-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
  declarations: [IssueInputComponent],
  exports: [IssueInputComponent],
  providers: [],
})
export class IssueInputModule {

}
