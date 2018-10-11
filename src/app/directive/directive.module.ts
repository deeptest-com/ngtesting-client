import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../service/client/user';
import { ClientService } from '../service/client/client';
import { PrivilegeService } from '../service/privilege';

import { ResizeDirective } from './resize/resize.directive';
import { PrjPrivilegeDirective } from './privilege/prj-privilege.directive';
import { OrgPrivilegeDirective } from './privilege/org-privilege.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeDirective, PrjPrivilegeDirective, OrgPrivilegeDirective],
  exports: [ResizeDirective, PrjPrivilegeDirective, OrgPrivilegeDirective],
  providers: [UserService, ClientService, PrivilegeService, OrgPrivilegeDirective],
})
export class DirectiveModule {

}

