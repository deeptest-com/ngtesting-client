import { Routes, RouterModule }  from '@angular/router';

import { Implement } from './implement.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Implement,
    children: [
      { path: 'plan', loadChildren: './plan/plan.module#PlanModule' },
      { path: 'plan/:planId/execution', loadChildren: './execution/execution.module#ExecutionModule' },

      { path: 'suite', loadChildren: './suite/suite.module#SuiteModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
