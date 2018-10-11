import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './org-admin.routing';
import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { OrgAdmin } from './org-admin.component';

import { OrgService } from '../../service/admin/org';
import { RouteService } from '../../service/route';
import { AccountService } from '../../service/client/account';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

  ],
  declarations: [
    OrgAdmin,
  ],
  providers: [
    RouteService, AccountService, OrgService,
  ],
})
export class OrgAdminModule {}

