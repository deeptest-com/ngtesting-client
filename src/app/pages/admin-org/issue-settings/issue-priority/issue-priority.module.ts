import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';

import { routing }       from './issue-priority.routing';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { PipeModule } from '../../../../pipe/pipe.module';
import { DirectiveModule } from '../../../../directive/directive.module';
import { PopDialogModule } from '../../../../components/pop-dialog';

import { RouteService } from '../../../../service/route';
import { RequestService } from '../../../../service/request';
import { DatetimePickerService } from '../../../../service/datetime-picker';

import { IssuePriorityService } from '../../../../service/admin/issue-priority';
import { IssuePrioritySolutionService } from '../../../../service/admin/issue-priority-solution';

import { IssuePriority } from '.';
import { IssuePriorityList } from './priority-list';
import { IssuePriorityEdit } from './priority-edit';

import { IssuePrioritySolutionList } from './priority-solution-list';
import { IssuePrioritySolutionEdit } from './priority-solution-edit';

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
    IssuePriority,
    IssuePriorityList,
    IssuePriorityEdit,
    IssuePriorityList,
    IssuePriorityEdit,
    IssuePrioritySolutionList,
    IssuePrioritySolutionEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    IssuePriorityService,
    IssuePrioritySolutionService,
  ],
})
export class IssuePriorityModule {}

