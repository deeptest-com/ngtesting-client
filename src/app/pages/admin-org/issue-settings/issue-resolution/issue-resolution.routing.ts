import { Routes, RouterModule }  from '@angular/router';

import { IssueResolution } from './issue-resolution.component';
import { IssueResolutionList } from './list/list.component';

import { IssueResolutionEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueResolution,
    children: [
      { path: 'list', component: IssueResolutionList },
      { path: 'edit/:id', component: IssueResolutionEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
