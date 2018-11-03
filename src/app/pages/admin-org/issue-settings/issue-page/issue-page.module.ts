import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-page.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';
import { IssuePageService } from '../../../../service/admin/issue-page';

import { IssuePage } from './issue-page.component';

import { IssuePageList } from './page-list';
import { IssuePageEdit } from './page-edit';
import { IssuePageConfig } from './page-config';

import { IssueSolutionList } from './solution-list';
import { IssueSolutionEdit } from './solution-edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule, DirectiveModule, PopDialogModule,
  ],
  declarations: [
    IssuePage,
    IssuePageList,
    IssuePageEdit, IssuePageConfig,
    IssueSolutionList,
    IssueSolutionEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    IssuePageService,
  ],
})
export class IssuePageModule {}
