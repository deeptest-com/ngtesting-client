import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { IssueInputDesignComponent } from './issue-input-design.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
  declarations: [IssueInputDesignComponent],
  exports: [IssueInputDesignComponent],
  providers: [],
})
export class IssueInputDesignModule {

}
