import { Routes, RouterModule }  from '@angular/router';

import { IssueSettings } from './issue-settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueSettings,
    children: [
      { path: 'issue-type', loadChildren: './issue-type/issue-type.module#IssueTypeModule' },
      { path: 'issue-priority', loadChildren: './issue-priority/issue-priority.module#IssuePriorityModule' },
      { path: 'issue-status', loadChildren: './issue-status/issue-status.module#IssueStatusModule' },
      { path: 'issue-resolution', loadChildren: './issue-resolution/issue-resolution.module#IssueResolutionModule' },

      { path: 'issue-field', loadChildren: '../common-settings/custom-field/custom-field.module#CustomFieldModule' },
      { path: 'issue-page', loadChildren: './issue-page/issue-page.module#IssuePageModule' },

      { path: 'issue-workflow', loadChildren: './issue-workflow/issue-workflow.module#IssueWorkflowModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
