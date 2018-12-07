import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule }
  from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing } from './plan.routing';

import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { PopDialogModule } from '../../../components/pop-dialog';

import { TaskEditModule, TaskEditComponent } from '../task/edit';
import { CaseSelectionModule, CaseSelectionComponent } from '../../../components/case-selection';
import { EnvironmentConfigModule, EnvironmentConfigComponent } from '../../../components/environment-config';
import { ChartExecutionModule } from '../../../components/chart/chart-execution';
import { ExecutionBarModule } from '../../../components/execution-bar';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DateFormatPipe } from '../../../pipe/date';
import { DatetimePickerService } from '../../../service/datetime-picker';
import { PlanService } from '../../../service/client/plan';
import { TaskService } from '../../../service/client/task';
import { SuiteService } from '../../../service/client/suite';
import { CaseService } from '../../../service/client/case';
import { UserService } from '../../../service/client/user';

import { ProjectService } from '../../../service/client/project';
import { AccountService } from '../../../service/client/account';
import { ReportService } from '../../../service/client/report';

import { Plan } from './plan.component';
import { PlanList } from './list/list.component';
import { PlanView } from './view/view.component';
import { PlanEdit } from './edit/edit.component';

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
    EnvironmentConfigModule,
    ChartExecutionModule,
    ExecutionBarModule,
  ],
  declarations: [
    Plan,
    PlanList,
    PlanView,
    PlanEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService, DateFormatPipe,
    PlanService, TaskService, SuiteService, CaseService, UserService,
    AccountService, ProjectService, ReportService,
  ],
  entryComponents: [
    TaskEditComponent,
    CaseSelectionComponent,
  ],
})
export class PlanModule {}
