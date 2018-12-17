import { Injectable, Compiler } from '@angular/core';
import { IssueEdit } from './issue-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IssueEditService {

    constructor(private modalService: NgbModal, private compiler: Compiler) {

    }

    genPage(id): any {
      this.compiler.clearCacheFor(IssueEdit);
      const page = this.modalService.open(IssueEdit, { windowClass: 'pop-modal' });

      page.componentInstance.id = id;

      return page;
    }

}

