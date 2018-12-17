import { Routes, RouterModule } from '@angular/router';

import { Issue } from './issue.component';
import { IssueQuery } from './query/query.component';

import { IssueCreate } from './create/create.component';
import { IssueView } from './view/view.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Issue,
    children: [
      {
        path: 'query/:rule/:orderBy',
        component: IssueQuery,
      },
      { path: 'filter/:filterId',
        component: IssueQuery,
      },
      { path: 'create', component: IssueCreate },
      { path: ':id/view', component: IssueView },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
