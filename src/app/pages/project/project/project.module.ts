import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppTranslationModule } from '../../../app.translation.module';
import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { TableTreeModule } from '../../../components/table-tree';
import { PopDialogModule } from '../../../components/pop-dialog';
import { ChartDesignModule } from '../../../components/chart/chart-design';
import { ChartExecutionModule } from '../../../components/chart/chart-execution';
import { SearchSelectModule } from '../../../components/search-select';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';

import { routing }       from './project.routing';
import { ProjectService } from '../../../service/project';
import { UserService } from '../../../service/user';
import { UserAndGroupService } from '../../../service/userAndGroup';
import { ReportService } from '../../../service/report';
import { VerService } from '../../../service/ver';
import { EnvService } from '../../../service/env';

import { Project } from './project.component';
import { ProjectList } from './list/list.component';
import { ProjectView } from './view/view.component';

import { ProjectEditInfo } from './edit/info/info.component';
import { ProjectEditMember } from './edit/member/member.component';
import { ProjectVerList } from './edit/ver/list.component';
import { ProjectVerEdit } from './edit/ver/edit.component';
import { ProjectEnvList } from './edit/env/list.component';
import { ProjectEnvEdit } from './edit/env/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule,
    DirectiveModule,
    TableTreeModule,
    PopDialogModule,
    ChartDesignModule,
    ChartExecutionModule,
    SearchSelectModule,
    AppTranslationModule,
  ],
  declarations: [
    Project,
    ProjectList,
    ProjectView,
    ProjectEditInfo,
    ProjectEditMember,
    ProjectVerList,
    ProjectVerEdit,
    ProjectEnvList,
    ProjectEnvEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    ProjectService,
    UserService,
    UserAndGroupService,
    ReportService,
    VerService,
    EnvService,
  ],
})
export class ProjectModule {}

