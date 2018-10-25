import { Routes, RouterModule }  from '@angular/router';

import { IssueField } from './issue-field.component';
import { IssueFieldList } from './list/list.component';

import { IssueFieldEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueField,
    children: [
      { path: 'list', component: IssueFieldList },
      { path: 'edit/:id', component: IssueFieldEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
