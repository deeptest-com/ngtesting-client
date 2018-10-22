import { Routes, RouterModule }  from '@angular/router';

import { IssueStatus } from './issue-status.component';
import { IssueStatusList } from './list/list.component';

import { IssueStatusEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueStatus,
    children: [
      { path: 'list', component: IssueStatusList },
      { path: 'edit/:id', component: IssueStatusEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
