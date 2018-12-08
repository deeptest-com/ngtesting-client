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
import * as _ from "lodash";

declare var jQuery;

@Component({
  selector: 'issue-workflow-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-edit.scss'],
  templateUrl: './workflow-edit.html',
})
export class IssueWorkflowEdit implements OnInit, AfterViewInit {

  id: number;

  model: any = {};
  statuses: any[] = [];
  form: FormGroup;

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueWorkflowService: IssueWorkflowService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
    this.buildForm();
  }
  ngAfterViewInit() {}

  buildForm(): void {
    this.form = this.fb.group(
      {
        'name': ['', [Validators.required]],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, []);
  }

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
  };

  loadData() {
    this.issueWorkflowService.get(this.id).subscribe((json: any) => {
      this.model = json.data;
      this.statuses = json.statuses;

      _.forEach(this.statuses, (item: any, index: number) => {
        this.form.addControl('status-' + item.id, new FormControl('', []));
      });
    });
  }

  save() {
    this.issueWorkflowService.save(this.model, this.statuses).subscribe((json: any) => {
      if (json.code == 1) {

        this.formErrors = ['保存成功'];
        this.back();
      } else {
        this.formErrors = [json.msg];
      }
    });
  }
  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-list');
  }

  delete() {
    this.issueWorkflowService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  select(key: string) {
    const val = key === 'all' ? true : false;
    for (const status of this.statuses) {
      status.selected = val;
    }
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

