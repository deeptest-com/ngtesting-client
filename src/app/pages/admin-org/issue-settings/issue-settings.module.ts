import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

import { routing } from './issue-settings.routing';
import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { PopDialogModule } from '../../../components/pop-dialog';

import { IssueSettings } from './issue-settings.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule, DirectiveModule, PopDialogModule,
  ],
  declarations: [
    IssueSettings,
  ],
  providers: [

  ],
})
export class IssueSettingsModule {}

