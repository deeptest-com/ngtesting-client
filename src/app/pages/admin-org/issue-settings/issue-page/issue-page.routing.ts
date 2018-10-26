import { Routes, RouterModule }  from '@angular/router';

import { IssuePage } from './issue-page.component';

import { IssuePageMain } from './main/main.component';
import { IssuePageEdit } from './page-edit/page-edit.component';
import { IssueSolutionEdit } from './solution-edit/solution-edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePage,
    children: [
      { path: 'main', component: IssuePageMain },
      { path: 'page-edit/:id', component: IssuePageEdit },
      { path: 'solution-edit/:id', component: IssueSolutionEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
