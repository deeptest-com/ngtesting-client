import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing }       from './execution.routing';

import { PipeModule } from '../../../pipe/pipe.module';
import { FileUploaderModule } from '../../../components/file-uploader';

import { DirectiveModule } from '../../../directive/directive.module';
import { SlimLoadingBarModule } from '../../../components/ng2-loading-bar';
import { ZtreeModule } from '../../../components/ztree';
import { StepsTableModule } from '../../../components/steps-table';
import { CustomFieldModule } from '../../../components/custom-field';
import { FieldModule } from '../../../components/field';
import { CommentsModule } from '../../../components/comments';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';

import { TaskService } from '../../../service/client/task';
import { SuiteService } from '../../../service/client/suite';
import { CaseService } from '../../../service/client/case';
import { CaseStepService } from '../../../service/client/case-step';
import { CaseInTaskService } from '../../../service/client/case-in-task';
import { CaseAttachmentService } from '../../../service/client/case-attachment';
import { PrivilegeService } from '../../../service/privilege';
import { CommentsService } from '../../../service/client/comments';

import { Execution } from './execution.component';
import { ExecutionSuite } from './suite/suite.component';
import { ExecutionResult } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule,
    FileUploaderModule,

    DirectiveModule,
    SlimLoadingBarModule.forRoot(),
    ZtreeModule,
    StepsTableModule,
    CustomFieldModule,
    FieldModule,
    CommentsModule,
  ],
  declarations: [
    Execution,
    ExecutionSuite,
    ExecutionResult,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    TaskService,
    SuiteService,
    CaseService,
    CaseStepService,
    CaseInTaskService,
    PrivilegeService,
    CommentsService,
    CaseAttachmentService,
  ],
})
export class ExecutionModule {}

