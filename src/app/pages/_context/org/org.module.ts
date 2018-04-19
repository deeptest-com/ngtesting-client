import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing }       from './org.routing';
import { NgaModule } from '../../../theme/nga.module';

import { OrgResolve } from './org.resolve';
import { ProjectService } from '../../../service/project';
import { AccountService } from '../../../service/account';

import { Org } from './org.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgaModule, routing],
  declarations: [Org],
  providers: [
    AccountService, ProjectService, OrgResolve
  ]
})
export class OrgModule {

}
