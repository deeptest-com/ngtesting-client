import { Routes, RouterModule } from '@angular/router';

import { SuiteComponent } from './suite.component';
import { SuiteListComponent } from './list/list.component';
import { SuiteEditComponent } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SuiteComponent,
    children: [
      { path: 'list', component: SuiteListComponent },
      { path: ':suiteId/edit', component: SuiteEditComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

