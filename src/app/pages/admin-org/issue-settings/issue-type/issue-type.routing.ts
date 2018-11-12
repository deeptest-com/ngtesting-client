import { Routes, RouterModule }  from '@angular/router';

import { IssueType } from './issue-type.component';

import { IssueTypeList } from './type-list';
import { IssueTypeEdit } from './type-edit';
import { IssueTypeSolutionList } from './type-solution-list';
import { IssueTypeSolutionEdit } from './type-solution-edit';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssueType,
    children: [
      { path: 'type-list', component: IssueTypeList },
      { path: 'type-edit/:id', component: IssueTypeEdit },

      { path: 'type-solution-list', component: IssueTypeSolutionList },
      { path: 'type-solution-edit/:id', component: IssueTypeSolutionEdit },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
