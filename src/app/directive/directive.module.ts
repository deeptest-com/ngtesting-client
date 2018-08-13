import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../service/user';
import { PrivilegeService } from '../service/privilege';

import { ResizeDirective } from './resize/resize.directive';
import { PrivilegeDirective } from './privilege/privilege.directive';
import { OrgPrivilegeDirective } from './privilege/org-privilege.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeDirective, PrivilegeDirective, OrgPrivilegeDirective],
  exports: [ResizeDirective, PrivilegeDirective, OrgPrivilegeDirective],
  providers: [UserService, PrivilegeService, OrgPrivilegeDirective],
})
export class DirectiveModule {

}

