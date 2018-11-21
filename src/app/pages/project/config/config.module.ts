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

import { SearchSelectModule } from '../../../components/search-select';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';

import { routing } from './config.routing';

import { BaMenuService } from '../../../theme';
import { UserService } from '../../../service/client/user';
import { UserAndGroupService } from '../../../service/client/userAndGroup';
import { ProjectService } from '../../../service/client/project';

import { ProjectConfigService } from '../../../service/client/project-config';
import { ProjectMemberService } from '../../../service/client/project-member';

import { ModuleService } from '../../../service/client/module';
import { VerService } from '../../../service/client/ver';
import { EnvService } from '../../../service/client/env';

import { IssueTypeService } from '../../../service/client/issue-type';
import { IssuePriorityService } from '../../../service/client/issue-priority';
import { IssuePageService } from '../../../service/client/issue-page';
import { IssueWorkflowService } from '../../../service/client/issue-workflow';

import { ProjectConfig } from './config.component';
import { ProjectEditMember } from './member/member.component';
import { ProjectModuleList } from './module/list.component';
import { ProjectModuleEdit } from './module/edit.component';
import { ProjectVerList } from './ver/list.component';
import { ProjectVerEdit } from './ver/edit.component';
import { ProjectEnvList } from './env/list.component';
import { ProjectEnvEdit } from './env/edit.component';

import { ProjectTypeEdit } from './type/edit.component';
import { ProjectPriorityEdit } from './priority/edit.component';
import { ProjectPageEdit } from './page/edit.component';
import { ProjectWorkflowEdit } from './workflow/edit.component';

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
    SearchSelectModule,
    AppTranslationModule,
  ],
  declarations: [
    ProjectEditMember,
    ProjectModuleList,
    ProjectModuleEdit,
    ProjectVerList,
    ProjectVerEdit,
    ProjectEnvList,
    ProjectEnvEdit,
    ProjectConfig,

    ProjectTypeEdit,
    ProjectPriorityEdit,
    ProjectPageEdit,
    ProjectWorkflowEdit,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    BaMenuService,
    UserService,
    UserAndGroupService,

    ProjectService, ProjectConfigService,
    ProjectMemberService,
    ModuleService,
    VerService,
    EnvService,

    IssueTypeService,
    IssuePriorityService,
    IssuePageService,
    IssueWorkflowService,
  ],
})
export class ConfigModule {}

