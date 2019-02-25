import { Injectable, Compiler } from '@angular/core';
import { IssueTranPageComponent } from './issue-tran-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueTranPageService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(issue, tran): any {
      this.compiler.clearCacheFor(IssueTranPageComponent);
      const page = this.modalService.open(IssueTranPageComponent, { windowClass: 'pop-modal' });

      page.componentInstance.issue = issue;
      page.componentInstance.tran = tran;

      return page;
    }

}

