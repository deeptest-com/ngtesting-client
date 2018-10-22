import { Routes, RouterModule }  from '@angular/router';

import { IssueType } from './issue-type.component';
import { IssueTypeList } from './list/list.component';

import { IssueTypeEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueType,
    children: [
      { path: 'list', component: IssueTypeList },
      { path: 'edit/:id', component: IssueTypeEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
