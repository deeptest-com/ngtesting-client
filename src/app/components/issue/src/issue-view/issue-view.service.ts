import { Injectable, Compiler } from '@angular/core';
import { IssueView } from './issue-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueViewPopupService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(id): any {
      this.compiler.clearCacheFor(IssueView);
      const page = this.modalService.open(IssueView, { windowClass: 'pop-modal' });
      page.componentInstance.id = id;
      return page;
    }

}

