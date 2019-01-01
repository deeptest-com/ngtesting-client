import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { ValidatorUtils } from '../../../validator/validator.utils';

import { RouteService } from '../../../service/route';
import { IssueService } from '../../../service/client/issue';

import { PrivilegeService } from '../../../service/privilege';
import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: 'issue-create',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create.scss'],
  templateUrl: './create.html',
})
export class IssueCreate implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueCreate';
  canCreate: boolean;

  issue: any = {};
  issuePropMap: any = {};

  page: any = {};

  form: FormGroup;
  validateMsg: any = {};

  next: boolean = false;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder, private toastyService: ToastyService,
              private issueService: IssueService, private privilegeService: PrivilegeService) {

    this.canCreate = this.privilegeService.hasPrivilege('issue-maintain');

    this.loadData();
    this.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  formErrors = [];

  loadData() {
    this.issueService.create().subscribe((json: any) => {
      this.issue = json.data;

      this.page = json.page;

      this.onValueChanged();
    });
  }

  save() {
    const data = _.clone(this.issue);
    this.issueService.save(data, this.page.id).subscribe((json: any) => {
      if (json.code == 1) {
        if (this.next) {
          this.form.markAsPristine();
          this.next = true;
          this.loadData();
        } else {
          this.issueService.gotoView(json.id);
        }
      }
    });
  }

  back() {
    this.issueService.gotoList();
  }

  ngOnDestroy(): void {
  }

  buildForm() {
    this.form = this.fb.group({ next: [] });

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    console.log('onValueChanged');
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, []);
  }

}

