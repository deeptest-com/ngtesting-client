import { Injectable, Compiler } from '@angular/core';
import { IssueTag } from './issue-tag.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueTagPopupService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(issue): any {
      this.compiler.clearCacheFor(IssueTag);
      const page = this.modalService.open(IssueTag, { windowClass: 'pop-modal' });

      page.componentInstance.issue = issue;

      return page;
    }

}

