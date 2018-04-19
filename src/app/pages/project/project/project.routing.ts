import { Routes, RouterModule }  from '@angular/router';

import { Project } from './project.component';
import { ProjectList } from './list/list.component';

import { ProjectEditInfo } from './edit/info/info.component';
import { ProjectEditMember } from './edit/member/member.component';
import { ProjectVerList } from './edit/ver/list.component';
import { ProjectVerEdit } from './edit/ver/edit.component';
import { ProjectEnvList } from './edit/env/list.component';
import { ProjectEnvEdit } from './edit/env/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Project,
    children: [
      { path: '', component: ProjectList },

      { path: ':id/edit/:type/info', component: ProjectEditInfo },
      { path: ':id/edit/member', component: ProjectEditMember },
      { path: ':id/edit/ver/list', component: ProjectVerList },
      { path: ':id/edit/ver/:eid', component: ProjectVerEdit },
      { path: ':id/edit/env/list', component: ProjectEnvList },
      { path: ':id/edit/env/:eid', component: ProjectEnvEdit },

      // /pages/org/6/prjs/NaN/edit/undefined/ver/edit/1

    ],
  },
];

export const routing = RouterModule.forChild(routes);
