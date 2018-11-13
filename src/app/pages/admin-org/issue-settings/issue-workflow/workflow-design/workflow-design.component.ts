import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbModalModule, NgbPaginationModule, NgbDropdownModule,
  NgbTabsetModule, NgbButtonsModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssueWorkflowService } from '../../../../../service/admin/issue-workflow';
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

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueWorkflowService: IssueWorkflowService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
  }
  ngAfterViewInit() {}

  loadData() {
    const that = this;
    that.issueWorkflowService.get(that.id).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  // save() {
  //   const that = this;
  //
  //   that.issueWorkflowService.save(that.model).subscribe((json: any) => {
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

