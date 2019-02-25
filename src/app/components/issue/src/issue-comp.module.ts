import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule, NgbDateParserFormatter,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PopDialogModule } from '../../../components/pop-dialog';

import { PipeModule } from '../../../pipe/pipe.module';
import { DateFormatPipe } from '../../../pipe/date';
import { SearchSelectModule } from '../../../components/search-select';

import { CommentsService } from '../../../service/client/comments';

import { FileUploaderModule } from '../../file-uploader';
import { CommentsModule } from '../../comments';

import { FieldModule } from '../../field';

import { IssuePage } from './issue-page/issue-page.component';

import { IssueView } from './issue-view/issue-view.component';
import { IssueCreate } from './issue-create/issue-create.component';
import { IssueEdit } from './issue-edit/issue-edit.component';
import { IssueTranPageComponent } from './issue-tran-page/issue-tran-page.component';
import { IssueAssign } from './issue-assign/issue-assign.component';
import { IssueWatch } from './issue-watch/issue-watch.component';
import { IssueTag } from './issue-tag/issue-tag.component';
import { IssueLink } from './issue-link/issue-link.component';

import { IssuePageService } from '../../../service/client/issue-page';
import { IssueTranPageService } from './issue-tran-page/issue-tran-page.service';
import { IssueViewPopupService } from './issue-view/issue-view.service';
import { IssueCreatePopupService } from './issue-create/issue-create.service';
import { IssueEditPopupService } from './issue-edit/issue-edit.service';
import { IssueAssignPopupService } from './issue-assign/issue-assign.service';
import { IssueWatchPopupService } from './issue-watch/issue-watch.service';
import { IssueTagPopupService } from './issue-tag/issue-tag.service';
import { IssueLinkPopupService } from './issue-link/issue-link.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule, NgbTabsetModule,
    PipeModule, PopDialogModule,
    SearchSelectModule,
    FileUploaderModule, FieldModule, CommentsModule,
  ],
  declarations: [
    IssuePage, IssueView, IssueCreate, IssueEdit,
    IssueTranPageComponent, IssueAssign, IssueWatch, IssueTag, IssueLink,
  ],
  exports: [
    IssuePage, IssueView, IssueCreate, IssueEdit,
    IssueTranPageComponent, IssueAssign, IssueWatch, IssueTag, IssueLink,
  ],
  providers: [DateFormatPipe, CommentsService, IssuePageService,
    IssueTranPageService, IssueViewPopupService, IssueCreatePopupService, IssueEditPopupService,
    IssueAssignPopupService, IssueWatchPopupService, IssueTagPopupService, IssueLinkPopupService],
  entryComponents: [
    IssueView, IssueCreate, IssueEdit, IssueTranPageComponent, IssueAssign, IssueWatch, IssueTag, IssueLink,
  ],
})
export class IssueCompModule {

}
