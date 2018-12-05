import { Routes, RouterModule }  from '@angular/router';

import { CustomField } from './custom-field.component';
import { CustomFieldList } from './list/list.component';

import { CustomFieldEdit } from './edit/edit.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: CustomField,
    children: [
      { path: 'list/:applyTo', component: CustomFieldList },
      { path: 'edit/:id/:applyTo', component: CustomFieldEdit },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
