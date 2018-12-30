import { IssueViewPopupService } from './src/issue-view/issue-view.service';
import { IssueCreatePopupService } from './src/issue-create/issue-create.service';
import { IssueEditPopupService } from './src/issue-edit/issue-edit.service';



import { IssuePage } from './src/issue-page/issue-page.component';
import { IssueView } from './src/issue-view/issue-view.component';
import { IssueCreate } from './src/issue-create/issue-create.component';
import { IssueEdit } from './src/issue-edit/issue-edit.component';

import { IssueCompModule } from './src/issue-comp.module';

export {
  IssueCompModule,
  IssueViewPopupService, IssueCreatePopupService, IssueEditPopupService,
  IssuePage, IssueView, IssueCreate, IssueEdit,
};

