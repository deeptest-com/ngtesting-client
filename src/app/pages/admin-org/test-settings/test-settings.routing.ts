import { Routes, RouterModule }  from '@angular/router';

import { TestSettings } from './test-settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TestSettings,
    children: [
      { path: 'project-role', loadChildren: './project-role/project-role.module#ProjectRoleModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

