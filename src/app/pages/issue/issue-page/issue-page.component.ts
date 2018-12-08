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

  form: any;

  @Input() page: any = {};
  @Input() issuePropMap: any = {};

  _issue: any = {};
  @Input() set issue (val) {
    this._issue = val;
  }
  get issue () {
    return this._issue;
  }

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private toastyService: ToastyService, private privilegeService: PrivilegeService,
              private issueService: IssueService) {

    this.canEdit = this.privilegeService.hasPrivilege('issue-maintain');

    this.buildForm();
  }
  ngOnInit() {

  }

  ngAfterViewInit() {}

  saveField($event: any) {
    console.log($event);

    this.issueService.updateField(this._issue.id, $event.data).subscribe((json: any) => {
      if (json.code == 1) {
        $event.deferred.resolve();
      }
    });
  }

  ngOnDestroy(): void {

  }

  buildForm() {
    this.form = this.fb.group({});
  }

}

