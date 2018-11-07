import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-page.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { DndModule, SortableContainer } from '../../../../components/ng2-dnd';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';
import { IssueInputModule } from '../../../../components/issue-input';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';
import { IssuePageService } from '../../../../service/admin/issue-page';
import { IssuePageTabService } from '../../../../service/admin/issue-page-tab';
import { IssuePageElemService } from '../../../../service/admin/issue-page-elem';

import { IssuePage } from './issue-page.component';

import { IssuePageList } from './page-list';
import { IssuePageEdit } from './page-edit';
import { IssuePageConfig } from './page-config';

import { IssuePageSolutionList } from './page-solution-list';
import { IssuePageSolutionEdit } from './page-solution-edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    DndModule.forRoot(),
    PipeModule, DirectiveModule, PopDialogModule,
    IssueInputModule,
  ],
  declarations: [
    IssuePage,
    IssuePageList,
    IssuePageEdit, IssuePageConfig,
    IssuePageSolutionList,
    IssuePageSolutionEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    SortableContainer,
    DatetimePickerService,
    IssuePageService, IssuePageTabService, IssuePageElemService,
  ],
})
export class IssuePageModule {}
