import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { NgaModule } from '../../../theme/nga.module';
import { routing }       from './aitask.routing';

import { PipeModule } from '../../../pipe/pipe.module';
import { DirectiveModule } from '../../../directive/directive.module';
import { SlimLoadingBarModule } from '../../../components/ng2-loading-bar';
import { ZtreeModule } from '../../../components/ztree';
import { FileUploaderModule } from '../../../components/file-uploader';

import { RouteService } from '../../../service/route';
import { RequestService } from '../../../service/request';
import { DatetimePickerService } from '../../../service/datetime-picker';

import { AitaskService } from '../../../service/aitask';
import { PrivilegeService } from '../../../service/privilege';

import { Aitask } from './aitask.component';
import { AitaskSuite } from './suite/suite.component';
import { AitaskEdit } from './edit/edit.component';
import { AitaskView } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

    NgbModalModule, NgbPaginationModule, NgbDropdownModule,
    NgbTabsetModule, NgbButtonsModule, NgbCollapseModule,

    FileUploaderModule,
    PipeModule,
    DirectiveModule,
    ToastyModule,
    SlimLoadingBarModule.forRoot(),
    ZtreeModule,
  ],
  declarations: [
    Aitask,
    AitaskSuite,
    AitaskEdit,
    AitaskView,
  ],
  providers: [
    RouteService,
    RequestService,
    DatetimePickerService,
    AitaskService,
    PrivilegeService,
  ],
})
export class AitaskModule {}

