import { Routes, RouterModule }  from '@angular/router';

import { IssueWorkflow } from './issue-workflow.component';

import { IssueWorkflowList } from './workflow-list';
import { IssueWorkflowEdit } from './workflow-edit';
import { IssueWorkflowDesign } from './workflow-design';

import { IssueWorkflowSolutionList } from './workflow-solution-list';
import { IssueWorkflowSolutionEdit } from './workflow-solution-edit';
import { IssueWorkflowSolutionConfig } from './workflow-solution-config';

const routes: Routes = [
  {
    path: '',
    component: IssueWorkflow,
    children: [
      { path: 'workflow-list', component: IssueWorkflowList },
      { path: 'workflow-edit/:id', component: IssueWorkflowEdit },
      { path: 'workflow-design/:id', component: IssueWorkflowDesign },

      { path: 'workflow-solution-list', component: IssueWorkflowSolutionList },
      { path: 'workflow-solution-edit/:id', component: IssueWorkflowSolutionEdit },
      { path: 'workflow-solution-config/:id', component: IssueWorkflowSolutionConfig },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
