import { Injectable, Compiler } from '@angular/core';
import { IssueWatch } from './issue-watch.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueWatchPopupService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(issue): any {
      this.compiler.clearCacheFor(IssueWatch);
      const page = this.modalService.open(IssueWatch, { windowClass: 'pop-modal' });

      page.componentInstance.issue = issue;

      return page;
    }

}

