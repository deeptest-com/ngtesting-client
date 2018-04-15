import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,
  NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing } from './suite.routing';

import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { PopDialogModule } from '../../../components/pop-dialog';

import { RunEditModule, RunEditComponent } from '../run/edit';
import { CaseSelectionModule, CaseSelectionComponent } from '../../../components/case-selection';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';
import { MyDateParserFormatter } from '../../../service/my-date-parser-formatter';
import { PlanService } from '../../../service/plan';
import { RunService } from '../../../service/run';
import { SuiteService } from '../../../service/suite';
import { CaseService } from '../../../service/case';
import { UserService } from '../../../service/user';

import { ProjectService } from '../../../service/project';
import { AccountService } from '../../../service/account';
import { ReportService } from '../../../service/report';

import { SuiteComponent } from './suite.component';
import { SuiteListComponent } from './list/list.component';
import { SuiteViewComponent } from './view/view.component';
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
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule, NgbDatepickerModule,

    DirectiveModule,
    PipeModule,
    PopDialogModule,

    RunEditModule,
    CaseSelectionModule,
  ],
  declarations: [
    SuiteComponent,
    SuiteListComponent,
    SuiteViewComponent,
    SuiteEditComponent,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    PlanService, RunService, SuiteService, CaseService, UserService,
    AccountService, ProjectService, ReportService,
    {
      provide: NgbDateParserFormatter,
      useFactory: myDateParserFormatterFactory,
    },
  ],
  entryComponents: [
    RunEditComponent,
    CaseSelectionComponent,
  ],
})
export class SuiteModule {}
