import { Component, ViewEncapsulation, ViewChild, Compiler } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import {
  NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule, NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { logger, Utils } from '../../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssueWorkflowService } from '../../../../../service/admin/issue-workflow';
import { WorkflowTransitionComponent } from '../workflow-transition';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-workflow-design',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-design.scss'],
  templateUrl: './workflow-design.html',
})
export class IssueWorkflowDesign implements OnInit, AfterViewInit {

  id: number;
  model: any = {};
  statuses: any[] = [];
  tranMap: any = {};
  projectRoles: any[] = [];

  workflowTransition: any;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private compiler: Compiler, private modalService: NgbModal,
              private issueWorkflowService: IssueWorkflowService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
  }
  ngAfterViewInit() {

  }
  mouseenter($event) {
    jQuery($event.target).addClass('hover');
  }
  mouseleave($event) {
    jQuery($event.target).removeClass('hover');
  }

  loadData() {
    this.issueWorkflowService.design(this.id).subscribe((json: any) => {
      this.model = json.data;
      this.statuses = json.statuses;
      this.tranMap = json.tranMap;
      this.projectRoles = json.projectRoles;
    });
  }

  addTran(srcId, dictId) {
    console.log('addTran', srcId, dictId);

    this.compiler.clearCacheFor(WorkflowTransitionComponent);
    this.workflowTransition = this.modalService.open(WorkflowTransitionComponent, { windowClass: 'pop-modal' });
    this.workflowTransition.componentInstance.workflowId = this.id;
    this.workflowTransition.componentInstance.srcId = srcId;
    this.workflowTransition.componentInstance.dictId = dictId;
    this.workflowTransition.componentInstance.projectRoles = this.projectRoles;

    this.workflowTransition.result.then((result) => {
      logger.log('result', result);
    }, (reason) => {
      logger.log('reason', reason);
    });
  }

  editTran(tran) {
    console.log('editTran', tran);
  }
  removeTran(tran) {
    console.log('removeTran', tran);
  }

  add() {

  }

  // save() {
  //   const this = this;
  //
  //   this.issueWorkflowService.save(this.model).subscribe((json: any) => {
  //     if (json.code == 1) {
  //       CONSTANT.CASE_PROPERTY_MAP = json.issuePropertyMap;
  //
  //       this.back();
  //     } else {
  //     }
  //   });
  // }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-list');
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

