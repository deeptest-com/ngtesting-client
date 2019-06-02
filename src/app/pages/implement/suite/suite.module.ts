import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing } from './suite.routing';

import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { PopDialogModule } from '../../../components/pop-dialog';

import { TaskEditModule, TaskEditComponent } from '../task/edit';
import { CaseSelectionModule, CaseSelectionComponent } from '../../../components/case-selection';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';
import { MyDateParserFormatter } from '../../../service/my-date-parser-formatter';
import { PlanService } from '../../../service/client/plan';
import { TaskService } from '../../../service/client/task';
import { SuiteService } from '../../../service/client/suite';
import { CaseService } from '../../../service/client/case';
import { UserService } from '../../../service/client/user';

import { ProjectService } from '../../../service/client/project';
import { AccountService } from '../../../service/client/account';
import { ReportService } from '../../../service/client/report';

import { SuiteComponent } from './suite.component';
import { SuiteListComponent } from './list/list.component';
import { SuiteEditComponent } from './edit/edit.component';

export function myDateParserFormatterFactory() {
  return new MyDateParserFormatter('y-MM-dd');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    DirectiveModule,
    PipeModule,
    PopDialogModule,

    TaskEditModule,
    CaseSelectionModule,
  ],
  declarations: [
    SuiteComponent,
    SuiteListComponent,
    SuiteEditComponent,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    PlanService, TaskService, SuiteService, CaseService, UserService,
    AccountService, ProjectService, ReportService,
  ],
  entryComponents: [
    TaskEditComponent,
    CaseSelectionComponent,
  ],
})
export class SuiteModule {}
