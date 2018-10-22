import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-resolution.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';
import { IssueResolutionService } from '../../../../service/admin/issue-resolution';

import { IssueResolution } from './issue-resolution.component';
import { IssueResolutionList } from './list';
import { IssueResolutionEdit } from './edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule, DirectiveModule, PopDialogModule
  ],
  declarations: [
    IssueResolution,
    IssueResolutionList,
    IssueResolutionEdit
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    IssueResolutionService
  ]
})
export class IssueResolutionModule {}
