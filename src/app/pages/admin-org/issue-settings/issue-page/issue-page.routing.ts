import { Routes, RouterModule }  from '@angular/router';

import { IssuePage } from './issue-page.component';

import { IssuePageList } from './page-list';
import { IssuePageEdit } from './page-edit';

import { IssueSolutionList } from './solution-list';
import { IssueSolutionEdit } from './solution-edit';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePage,
    children: [
      { path: 'page-list', component: IssuePageList },
      { path: 'page-edit/:id', component: IssuePageEdit },

      { path: 'solution-list', component: IssueSolutionList },
      { path: 'solution-edit/:id', component: IssueSolutionEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
