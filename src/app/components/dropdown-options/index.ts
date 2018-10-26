import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TestCustomFieldOptionService } from '../../service/admin/test-custom-field-option';
import { IssueCustomFieldOptionService } from '../../service/admin/issue-custom-field-option';

import { DropdownOptionsComponent } from './src/dropdown-options.component';

export * from './src/dropdown-options.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [DropdownOptionsComponent],
  exports: [DropdownOptionsComponent],
  providers: [TestCustomFieldOptionService, IssueCustomFieldOptionService],
})
export class DropdownOptionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DropdownOptionsModule,
      providers: [TestCustomFieldOptionService, IssueCustomFieldOptionService],
    };
  }
}
