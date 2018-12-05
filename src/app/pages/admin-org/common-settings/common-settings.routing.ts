import { Routes, RouterModule }  from '@angular/router';

import { CommonSettings } from './common-settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CommonSettings,
    children: [
      { path: 'custom-field', loadChildren: './custom-field/custom-field.module#CustomFieldModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
