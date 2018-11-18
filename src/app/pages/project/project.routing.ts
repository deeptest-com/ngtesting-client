import { Routes, RouterModule }  from '@angular/router';

import { Project } from './project.component';

import { ProjectList } from './project/list/list.component';
import { ProjectEditInfo } from './project/edit/info.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Project,
    children: [
      { path: '', component: ProjectList },

      { path: ':id/edit/:type/info', component: ProjectEditInfo },
      { path: ':id/config', loadChildren: './config/config.module#ConfigModule' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
