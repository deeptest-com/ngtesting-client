import { Injectable, Compiler } from '@angular/core';
import { IssueAssign } from './issue-assign.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueAssignService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(issue, users): any {
      this.compiler.clearCacheFor(IssueAssign);
      const page = this.modalService.open(IssueAssign, { windowClass: 'pop-modal' });

      page.componentInstance.issue = issue;
      page.componentInstance.users = users;

      return page;
    }

}

