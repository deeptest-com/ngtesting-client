import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild }
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
  selector: 'issue-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class IssueView implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueView';
  canEdit: boolean;

  projectId: number;
  id: number;
  model: any = {};

  settings: any;
  data: any;
  form: any;

  issuePropertyMap: any;
  fields: any[] = [];

  routeSub: any;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private toastyService: ToastyService,
              private issueService: IssueService, private privilegeService: PrivilegeService) {
    this.issuePropertyMap = CONSTANT.CASE_PROPERTY_MAP;

    this.canEdit = this.privilegeService.hasPrivilege('issue-update');

    this.routeSub = this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      console.log('id', params, this.id);

      this.loadData();
    });
  }
  ngOnInit() {
  }
  ngAfterViewInit() {}

  loadData() {
    this.issueService.view(this.id).subscribe((json: any) => {
      this.model = json.data;
    });
  }

  back() {
    this.issueService.gotoList();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}

