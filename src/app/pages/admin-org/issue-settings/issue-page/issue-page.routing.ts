import { Routes, RouterModule }  from '@angular/router';

import { IssuePage } from './issue-page.component';
import { IssuePageList } from './list/list.component';

import { IssuePageEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePage,
    children: [
      { path: 'list', component: IssuePageList },
      { path: 'edit/:id', component: IssuePageEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
