import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppTranslationModule } from '../../app.translation.module';
import { PipeModule } from '../../pipe/pipe.module';
import { DirectiveModule } from '../../directive/directive.module';
import { TableTreeModule } from '../../components/table-tree';
import { PopDialogModule } from '../../components/pop-dialog';

import { SearchSelectModule } from '../../components/search-select';

import { RouteService } from '../../service/route';
import { RequestService } from '../../service/request';
import { DatetimePickerService } from '../../service/datetime-picker';

import { routing } from './project.routing';

import { BaMenuService } from '../../theme';
import { ProjectService } from '../../service/client/project';
import { ProjectConfigService } from '../../service/client/project-config';

import { UserService } from '../../service/client/user';
import { UserAndGroupService } from '../../service/client/userAndGroup';

import { Project } from './project.component';

import { ProjectList } from './project/list/list.component';
import { ProjectEditInfo } from './project/edit/info.component';

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
    Project,
    ProjectList,
    ProjectEditInfo,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    BaMenuService,
    ProjectService, ProjectConfigService,
    UserService,
    UserAndGroupService,
  ],
})
export class ProjectModule {}

