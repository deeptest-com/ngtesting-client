import { Injectable, Compiler } from '@angular/core';
import { IssueLink } from './issue-link.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueLinkPopupService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(issue): any {
      this.compiler.clearCacheFor(IssueLink);
      const page = this.modalService.open(IssueLink, { windowClass: 'pop-modal' });

      page.componentInstance.issue = issue;

      return page;
    }

}

