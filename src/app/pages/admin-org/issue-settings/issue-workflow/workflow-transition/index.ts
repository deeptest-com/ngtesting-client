import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IssueWorkflowService } from '../../../../../service/admin/issue-workflow';

import { WorkflowTransitionComponent } from './src/workflow-transition.component';

export * from './src/workflow-transition.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [WorkflowTransitionComponent],
  exports: [WorkflowTransitionComponent],
  providers: [IssueWorkflowService],
})
export class WorkflowTransitionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WorkflowTransitionModule,
      providers: [IssueWorkflowService],
    };
  }
}
