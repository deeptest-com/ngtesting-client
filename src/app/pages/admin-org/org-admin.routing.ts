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

      { path: 'issue-settings', loadChildren: './issue-settings/issue-settings.module#IssueSettingsModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
