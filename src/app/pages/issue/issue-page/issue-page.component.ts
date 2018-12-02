import {Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild, Input}
  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../global.state';

import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

import { PrivilegeService } from '../../../service/privilege';
import { IssueService } from '../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'issue-page',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss'],
  templateUrl: './issue-page.html',
})
export class IssuePage implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssuePage';
  canEdit: boolean;

  @Input() issue: any;
  @Input() page: any = {};
  issuePropertyMap: any;

  routeSub: any;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private toastyService: ToastyService, private privilegeService: PrivilegeService,
              private issueService: IssueService) {
    this.issuePropertyMap = CONSTANT.CASE_PROPERTY_MAP;
    this.canEdit = this.privilegeService.hasPrivilege('issue-maintain');
  }
  ngOnInit() {
  }
  ngAfterViewInit() {}

  ngOnDestroy(): void {

  }
}

