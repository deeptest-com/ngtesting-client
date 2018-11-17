import { Routes, RouterModule } from '@angular/router';

import { Issue } from './issue.component';
import { IssueQuery } from './query/query.component';

import { IssueEdit } from './edit/edit.component';
import { IssueView } from './view/view.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Issue,
    children: [
      {
        path: 'query/:rule',
        component: IssueQuery,
      },
      { path: 'filter/:filterId',
        component: IssueQuery,
      },
      { path: ':id/view', component: IssueView },
      { path: ':id/edit', component: IssueEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
