import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule, NgbDateParserFormatter,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { DndModule, SortableContainer } from '../../components/ng2-dnd';

import { NgaModule } from '../../theme/nga.module';
import { routing }       from './issue.routing';

import { PipeModule } from '../../pipe/pipe.module';
import { DirectiveModule } from '../../directive/directive.module';
import { SlimLoadingBarModule } from '../../components/ng2-loading-bar';
import { FileUploaderModule } from '../../components/file-uploader';
import { PopDialogModule } from '../../components/pop-dialog';
import { PageInfoModule } from '../../components/page-info';
import { TqlModule } from './tql';

import { FieldModule } from '../../components/field';
import { IssueCompModule } from '../../components/issue';

import { RouteService } from '../../service/route';
import { RequestService } from '../../service/request';
import { DatetimePickerService } from '../../service/datetime-picker';

// import { CommentsService } from '../../service/client/comments';
import { ClientService } from '../../service/client/client';
import { IssueQueryService } from './query/query.service';

import { IssueService } from '../../service/client/issue';
import { IssueOptService } from '../../service/client/issue-opt';
import { IssueTagService } from '../../service/client/issue-tag';
import { IssueLinkService } from '../../service/client/issue-link';
import { IssueSearchService } from '../../service/client/issue-search';
import { IssueWatchService } from '../../service/client/issue-watch';

import { PrivilegeService } from '../../service/privilege';

import { Issue } from './issue.component';
import { IssueQuery } from './query/query.component';

import { IssueTable } from './query/result-table/table.component';
import { IssuePropInTable } from './query/result-table/issue-prop-in-table';
import { IssueBrowse } from './query/result-browse/browse.component';

import { TableColumnSelectionModule } from './query/table-column-selection';
import { IssueOptModule } from './query/issue-opt';

import { IssueCreate } from './create/create.component';
import { IssueEdit } from './edit/edit.component';
import { IssueView } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,
    DndModule.forRoot(),

    FileUploaderModule,
    PipeModule,
    DirectiveModule,
    ToastyModule,
    SlimLoadingBarModule.forRoot(),
    PopDialogModule,
    PageInfoModule,
    TqlModule,
    IssueOptModule,
    TableColumnSelectionModule,
    FieldModule,
    IssueCompModule,
  ],
  declarations: [
    Issue,
    IssueQuery, IssueTable, IssuePropInTable, IssueBrowse,
    IssueCreate,
    IssueEdit,
    IssueView,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    ClientService,
    IssueQueryService, IssueService, IssueOptService,
    IssueTagService, IssueLinkService, IssueSearchService, IssueWatchService,
    PrivilegeService,
    SortableContainer,
  ],
})
export class IssueModule {}

