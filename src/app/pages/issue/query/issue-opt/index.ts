import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from '../../../../pipe/pipe.module';

import { IssueOpt } from './src/issue-opt.component';

export * from './src/issue-opt.component';

@NgModule({
  declarations: [IssueOpt],
  exports: [IssueOpt],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, PipeModule],
})
export class IssueOptModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IssueOptModule,
      providers: [],
    };
  }
}
