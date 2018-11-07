import { Routes, RouterModule }  from '@angular/router';

import { IssuePage } from './issue-page.component';

import { IssuePageList } from './page-list';
import { IssuePageEdit } from './page-edit';
import { IssuePageConfig } from './page-config';

import { IssuePageSolutionList } from './page-solution-list';
import { IssuePageSolutionEdit } from './page-solution-edit';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePage,
    children: [
      { path: 'page-list', component: IssuePageList },
      { path: 'page-edit/:id', component: IssuePageEdit },
      { path: 'page-config/:id', component: IssuePageConfig },

      { path: 'page-solution-list', component: IssuePageSolutionList },
      { path: 'page-solution-edit/:id', component: IssuePageSolutionEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
