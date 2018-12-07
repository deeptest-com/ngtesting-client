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
import { PopDialogComponent } from '../../../components/pop-dialog';
import * as _ from 'lodash';
import { Utils } from '../../../utils';
import { CustomValidator } from '../../../validator';

declare var jQuery;

@Component({
  selector: 'issue-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueEdit implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueEdit';
  canEdit: boolean;

  id: number;
  issue: any = {};
  issuePropMap: any = {};

  page: any = {};

  form: any;
  validateMsg: any = {};

  routeSub: any;

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder, private toastyService: ToastyService,
              private issueService: IssueService, private privilegeService: PrivilegeService) {

    this.canEdit = this.privilegeService.hasPrivilege('issue-update');

    this.routeSub = this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      console.log('id', params, this.id);
      this.loadData();
    });

    this.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  loadData() {
    this.issueService.edit(this.id).subscribe((json: any) => {
      this.issue = json.data;
      this.issuePropMap = json.issuePropMap;

      this.page = json.page;

      this.onValueChanged();
    });
  }

  update() {
    const data = _.clone(this.issue);
    this.issueService.update(data, this.page.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.issue = json.data;

        const toastOptions: ToastOptions = {
          title: '保存成功',
          timeout: 2000,
        };
        this.toastyService.success(toastOptions);

        const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/' +
          this.issue.id + '/edit';
        this._routeService.navTo(url);
      }
    });
  }

  back() {
    this.issueService.gotoList();
  }

  delete() {

  }

  onValueChanged(data?: any) {
    console.log('onValueChanged');
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, []);
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

  buildForm() {
    this.form = this.fb.group({});

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  formErrors = [];

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}

