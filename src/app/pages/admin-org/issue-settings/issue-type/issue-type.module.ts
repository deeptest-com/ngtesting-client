import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-type.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';

import { IssueTypeService } from '../../../../service/admin/issue-type';
import { IssueTypeSolutionService } from '../../../../service/admin/issue-type-solution';

import { IssueType } from '.';
import { IssueTypeList } from './type-list';
import { IssueTypeEdit } from './type-edit';
import { IssueTypeSolutionList } from './type-solution-list';
import { IssueTypeSolutionEdit } from './type-solution-edit';

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
    IssueType,
    IssueTypeList,
    IssueTypeEdit,
    IssueTypeSolutionList,
    IssueTypeSolutionEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    IssueTypeService,
    IssueTypeSolutionService,
  ],
})
export class IssueTypeModule {}
