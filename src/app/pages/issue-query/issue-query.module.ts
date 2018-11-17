import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule, NgbDatepickerModule, NgbDateParserFormatter }
  from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../theme/nga.module';
import { routing } from './issue-query.routing';

import { PipeModule } from '../../pipe/pipe.module';
import { DirectiveModule } from '../../directive/directive.module';
import { PopDialogModule } from '../../components/pop-dialog';

import { RouteService } from '../../service/route';
import { RequestService } from '../../service/request';
import { IssueQueryService } from '../../service/client/issue-query';

import { IssueQuery } from './issue-query.component';
import { IssueQueryList } from './list/list.component';
import { IssueQueryEdit } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule, NgbDatepickerModule,

    DirectiveModule,
    PipeModule,
    PopDialogModule,
  ],
  declarations: [
    IssueQuery,
    IssueQueryList,
    IssueQueryEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    IssueQueryService,
  ],
})
export class IssueQueryModule {}
