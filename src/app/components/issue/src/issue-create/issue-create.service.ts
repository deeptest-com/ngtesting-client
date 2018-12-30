import { Injectable, Compiler } from '@angular/core';
import { IssueCreate } from './issue-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueCreatePopupService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(): any {
      console.log('111');
      this.compiler.clearCacheFor(IssueCreate);
      console.log('222');
      const page = this.modalService.open(IssueCreate, { windowClass: 'pop-modal' });
      console.log('333');
      return page;
    }

}

