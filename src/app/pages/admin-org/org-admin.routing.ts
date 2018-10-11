import { Routes, RouterModule }  from '@angular/router';

import { OrgAdminComponent } from './org-admin.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OrgAdminComponent,
    children: [
      { path: 'org-settings', loadChildren: './org-settings/org-settings.module#OrgSettingsModule' },
      { path: 'test-settings', loadChildren: './test-settings/test-settings.module#TestSettingsModule' },
      { path: 'case-settings', loadChildren: './case-settings/case-settings.module#CaseSettingsModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
