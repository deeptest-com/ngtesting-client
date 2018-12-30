import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, Input }
  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../global.state';

import { RouteService } from '../../../../service/route';
import { CONSTANT } from '../../../../utils/constant';

import { PrivilegeService } from '../../../../service/privilege';
import { IssueService } from '../../../../service/client/issue';

@Component({
  selector: 'issue-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./issue-view.scss'],
  templateUrl: './issue-view.html',
})
export class IssueView implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueView';
  canEdit: boolean;

  page: any = {};
  issue: any = {};
  issuePropMap: any = {};
  issueTransMap: any = {};

  _id: number;
  set id(val: any) {
    this._id = val;
    console.log('id', this._id);
    this.loadData();
  }

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              public activeModal: NgbActiveModal,
              private issueService: IssueService, private privilegeService: PrivilegeService) {
    this.issuePropMap = CONSTANT.ISU_PROPERTY_MAP;

    this.canEdit = this.privilegeService.hasPrivilege('issue-update');
  }
  ngOnInit() {

  }

  ngAfterViewInit() {}

  loadData() {
    this.issueService.view(this._id).subscribe((json: any) => {
      this.issue = json.data;
      this.page = json.page;
      this.issuePropMap = json.issuePropMap;
      this.issueTransMap = json.issueTransMap;
      CONSTANT.ISU_PROPERTY_VAL_MAP = json.issuePropValMap;

      this.page.elements.forEach(elem => {
        elem.readonly = true;
      });
    });
  }

  optResult($event) {
    console.log('$event', $event);
  }

  cancel() {
    this.activeModal.dismiss({ act: 'cancel' });
  }

  ngOnDestroy(): void {

  }
}
