import { Injectable, Compiler } from '@angular/core';
import { IssueWatch } from './issue-watch.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueWatchService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(id): any {
      this.compiler.clearCacheFor(IssueWatch);
      const page = this.modalService.open(IssueWatch, { windowClass: 'pop-modal' });

      page.componentInstance.id = id;

      return page;
    }

}

