import { Routes, RouterModule }  from '@angular/router';

import { OrgSettings } from './org-settings.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: OrgSettings,
    children: [
      { path: 'org', loadChildren: './org/org.module#OrgModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'group', loadChildren: './group/group.module#GroupModule' },
      { path: 'org-role', loadChildren: './org-role/org-role.module#OrgRoleModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

