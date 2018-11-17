import { Routes, RouterModule }  from '@angular/router';

import { IssueQuery } from './issue-query.component';
import { IssueQueryList } from './list/list.component';
import { IssueQueryEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueQuery,
    children: [
      { path: 'list', component: IssueQueryList },
      { path: ':id/edit', component: IssueQueryEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

