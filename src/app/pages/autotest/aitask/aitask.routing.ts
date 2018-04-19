import { Routes, RouterModule }  from '@angular/router';

import { Aitask } from './aitask.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Aitask,
    children: [
    ]
  },
  {
    path: ':aitaskId',
    component: Aitask,
    children: [
    ]
  },
];

export const routing = RouterModule.forChild(routes);
