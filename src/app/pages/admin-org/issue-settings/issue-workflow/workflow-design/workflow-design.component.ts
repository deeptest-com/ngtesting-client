import { Component, ViewEncapsulation, ViewChild, Compiler, ChangeDetectorRef } from '@angular/core';
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
import { RouteService } from '../../../../../service/route';

import { IssueWorkflowService } from '../../../../../service/admin/issue-workflow';
import { IssueWorkflowTransitionService } from '../../../../../service/admin/issue-workflow-transition';

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
  currTran: any = {};

  pages: any[] = [];

  workflowTransition: any;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder,
              private compiler: Compiler, private modalService: NgbModal,
              private issueWorkflowService: IssueWorkflowService,
              private tranService: IssueWorkflowTransitionService) {

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

      this.pages = json.pages;
    });
  }

  addTran(srcStatusId, dictStatusId) {
    console.log('addTran', srcStatusId, dictStatusId);

    this.compiler.clearCacheFor(WorkflowTransitionComponent);
    this.workflowTransition = this.modalService.open(WorkflowTransitionComponent,
      { windowClass: 'pop-modal' });
    this.workflowTransition.componentInstance.model =
        { workflowId: this.id, srcStatusId: srcStatusId, dictStatusId: dictStatusId };

    this.workflowTransition.componentInstance.pages = this.pages;

    this.workflowTransition.result.then((result) => {
      this.tranMap[srcStatusId + '-' + dictStatusId] = result.model;
      // this.changeDetectorRef.markForCheck();
      // this.changeDetectorRef.detectChanges();

      console.log('result', srcStatusId + '-' + dictStatusId.id, result.model);
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  editTran(tran) {
    console.log('editTran', tran);

    this.compiler.clearCacheFor(WorkflowTransitionComponent);
    this.workflowTransition = this.modalService.open(WorkflowTransitionComponent,
      { windowClass: 'pop-modal' });
    this.workflowTransition.componentInstance.model = tran;
    this.workflowTransition.componentInstance.pages = this.pages;

    this.workflowTransition.result.then((result) => {
      tran = result.model;

      console.log('result', tran);
    }, (reason) => {
      console.log('reason', reason);
    });
  }
  removeTran(tran) {
    console.log('removeTran', tran);
    this.currTran = tran;

    this.modalWrapper.showModal();
  }

  delete(): any {
    const srcStatusId = this.currTran.srcStatusId;
    const dictStatusId = this.currTran.dictStatusId;

    this.tranService.delete(this.currTran.id).subscribe((json: any) => {
      this.currTran = {};
      this.tranMap[srcStatusId + '-' + dictStatusId] = null;
      this.modalWrapper.closeModal();
    });
  }

  // public trackItem (src: any, dict: any) {
  //   return !src ? '' : src.id + '-' + !dict ? '' : dict.id;
  // }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-list');
  }

  enterCol(id) {
    jQuery('td.col-' + id).addClass('col-hover');
  }
  leaveCol(id) {
    jQuery('td.col-' + id).removeClass('col-hover');
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

