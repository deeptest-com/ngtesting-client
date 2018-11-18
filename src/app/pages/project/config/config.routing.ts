import { Routes, RouterModule }  from '@angular/router';

import { ProjectConfig } from './config.component';

import { ProjectEditMember } from './member/member.component';

import { ProjectModuleList } from './module/list.component';
import { ProjectModuleEdit } from './module/edit.component';

import { ProjectVerList } from './ver/list.component';
import { ProjectVerEdit } from './ver/edit.component';

import { ProjectEnvList } from './env/list.component';
import { ProjectEnvEdit } from './env/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProjectConfig,
    children: [
      { path: 'module/list', component: ProjectModuleList },
      { path: 'module/:vid', component: ProjectModuleEdit },

      { path: 'ver/list', component: ProjectVerList },
      { path: 'ver/:vid', component: ProjectVerEdit },

      { path: 'env/list', component: ProjectEnvList },
      { path: 'env/:eid', component: ProjectEnvEdit },

      { path: 'member', component: ProjectEditMember },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
