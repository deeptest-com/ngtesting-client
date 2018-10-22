import { Routes, RouterModule }  from '@angular/router';

import { IssuePriority } from './issue-priority.component';
import { IssuePriorityList } from './list/list.component';

import { IssuePriorityEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePriority,
    children: [
      { path: 'list', component: IssuePriorityList },
      { path: 'edit/:id', component: IssuePriorityEdit }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
