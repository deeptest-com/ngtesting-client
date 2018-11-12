import { Routes, RouterModule }  from '@angular/router';

import { IssuePriority } from './issue-priority.component';

import { IssuePriorityList } from './priority-list';
import { IssuePriorityEdit } from './priority-edit';

import { IssuePrioritySolutionList } from './priority-solution-list';
import { IssuePrioritySolutionEdit } from './priority-solution-edit';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IssuePriority,
    children: [
      { path: 'priority-list', component: IssuePriorityList },
      { path: 'priority-edit/:id', component: IssuePriorityEdit },

      { path: 'priority-solution-list', component: IssuePrioritySolutionList },
      { path: 'priority-solution-edit/:id', component: IssuePrioritySolutionEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
