import { Routes, RouterModule } from '@angular/router';

import { SuiteComponent } from './suite.component';
import { SuiteListComponent } from './list/list.component';
import { SuiteViewComponent } from './view/view.component';
import { SuiteEditComponent } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SuiteComponent,
    children: [
      { path: 'list', component: SuiteListComponent },
      { path: ':suiteId/view', component: SuiteViewComponent },
      { path: ':suiteId/edit', component: SuiteEditComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);

