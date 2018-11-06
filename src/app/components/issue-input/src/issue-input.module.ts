import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssueInputComponent } from './issue-input.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [IssueInputComponent],
  exports: [IssueInputComponent],
  providers: [],
})
export class IssueInputModule {

}
