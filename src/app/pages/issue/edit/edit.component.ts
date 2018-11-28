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
import { IssueInputEditComponent } from '../../../components/issue-input/issue-input-edit';

declare var jQuery;

@Component({
  selector: 'issue-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueEdit implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueEdit';
  orgId: number;
  prjId: number;
  canEdit: boolean;

  id: number;
  issue: any = {};
  issuePropMap: any = {};

  page: any = {};

  form: any;

  @ViewChildren('input') inputs: QueryList<IssueInputEditComponent>;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder, private toastyService: ToastyService,
              private issueService: IssueService, private privilegeService: PrivilegeService) {

    this.canEdit = this.privilegeService.hasPrivilege('issue-update');
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];

      console.log('id', params, this.id);
    });

    this.loadData();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group({}, {},);
  }

  formErrors = [];

  loadData() {
    const opt = this.id ? 'edit' : 'create';

    this.issueService.get(this.id, opt).subscribe((json: any) => {
      this.issue = json.data;
      this.issuePropMap = json.issuePropMap;

      this.page = json.page;

      this.buildForm();
      this.validateForm();
    });
  }

  save() {
    console.log('===', this.issue, this.inputs.toArray());

    this.validateForm();

    // this.issueService.save(this.prjId, this.issue).subscribe((json: any) => {
    //   if (json.code == 1) {
    //     this.issue = json.data;
    //     this._state.notifyDataChanged(CONSTANT.EVENT_CASE_UPDATE, { node: this.issue, random: Math.random() });
    //
    //     const toastOptions: ToastOptions = {
    //       title: '保存成功',
    //       timeout: 2000,
    //     };
    //     this.toastyService.success(toastOptions);
    //   }
    // });
  }

  back() {
    const url = '/pages/org/' + this.orgId + '/prj/' + this.prjId + '/issue/query/lastest';
    this._routeService.navTo(url);
  }

  delete() {

  }

  validateForm(): void {
    this.page.elements.forEach(elem => {
      console.log(elem.code + ': ' + elem.required + ' --> ' + this.issue[elem.code]);
    });
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
  }

}

