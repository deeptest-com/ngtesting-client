import { Routes, RouterModule }  from '@angular/router';

import { CaseSettings } from './case-settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CaseSettings,
    children: [
      { path: 'custom-field', loadChildren: './custom-field/custom-field.module#CustomFieldModule' },
      { path: 'case-type', loadChildren: './case-type/case-type.module#CaseTypeModule' },
      { path: 'case-priority', loadChildren: './case-priority/case-priority.module#CasePriorityModule' },
      { path: 'case-exe-status', loadChildren: './case-exe-status/case-exe-status.module#CaseExeStatusModule' }
    ],
  },
];

export const routing = RouterModule.forChild(routes);

