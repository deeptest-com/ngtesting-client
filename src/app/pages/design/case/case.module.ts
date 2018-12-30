import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing }       from './case.routing';

import { FileUploaderModule } from '../../../components/file-uploader';
import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';

import { SlimLoadingBarModule } from '../../../components/ng2-loading-bar';
import { ZtreeModule } from '../../../components/ztree';
import { StepsTableModule } from '../../../components/steps-table';
import { FieldModule } from '../../../components/field';
import { TinyMCEModule } from '../../../components/tiny-mce';
import { CommentsModule } from '../../../components/comments';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';

import { SuiteService } from '../../../service/client/suite';
import { CaseService } from '../../../service/client/case';
import { CaseAttachmentService } from '../../../service/client/case-attachment';
// import { CommentsService } from '../../../service/client/comments';
import { CaseStepService } from '../../../service/client/case-step';
import { PrivilegeService } from '../../../service/privilege';

import { Case } from './case.component';
import { CaseSuite } from './suite/suite.component';
import { CaseEdit } from './edit/edit.component';
import { CaseView } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    PipeModule,
    DirectiveModule,
    ToastyModule,
    SlimLoadingBarModule.forRoot(),
    CommentsModule,
    ZtreeModule,
    StepsTableModule,
    FieldModule,
    TinyMCEModule,
    FileUploaderModule,
  ],
  declarations: [
    Case,
    CaseSuite,
    CaseEdit,
    CaseView,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    SuiteService,
    CaseService,
    CaseStepService,
    CaseAttachmentService,
    // CommentsService,
    PrivilegeService,
  ],
})
export class CaseModule {}

