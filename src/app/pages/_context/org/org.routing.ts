import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrgResolve } from './org.resolve';
import { Org } from './org.component';

// noinspection TypeScriptValidateTypes

export const routes: Routes = [
  {
    path: ':orgId',
    component: Org,
    canActivate: [OrgResolve],
    children: [
      { path: 'prjs', loadChildren: '../../project/project/project.module#ProjectModule' },
      { path: 'prj', loadChildren: './prj/prj.module#PrjModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
