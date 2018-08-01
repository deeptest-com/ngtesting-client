import { Routes, RouterModule }  from '@angular/router';

import { Execution } from './execution.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: ':taskId',
    children: [
      { path: ':act', component: Execution },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
