import { Component, ViewEncapsulation, Input, Pipe, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../global.state';
import { Utils } from '../../../../utils';

import { CONSTANT } from '../../../../utils/constant';
import { ValidatorUtils } from '../../../../validator/validator.utils';

import { RouteService } from '../../../../service/route';
import { PrivilegeService } from '../../../../service/privilege';
import { IssueOptService } from '../../../../service/client/issue-opt';

import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: 'issue-assign',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./issue-assign.scss'],
  templateUrl: './issue-assign.html',
})
export class IssueAssign implements OnInit, AfterViewInit, OnDestroy {
  issue: any = {};
  users: any[] = [];
  assignComments: string;
  assigneeId: number;

  form: FormGroup;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder,
              public activeModal: NgbActiveModal, private issueOptService: IssueOptService) {
    this.buildForm();
  }
  ngOnInit() {
    this.assigneeId = this.issue.assigneeId;
  }
  ngAfterViewInit() {}

  assign() {
    if (this.assigneeId == this.issue.assigneeId) {
      this.formErrors = ['请修改经办人再保存！'];
      return;
    }

    this.issueOptService.assign(this.issue.id, this.issue.assigneeId, this.assignComments).subscribe((json: any) => {
      if (json.code == 1) {
        this.activeModal.close({ act: 'assign', success: true });
      }
    });
  }

  cancel() {
      this.activeModal.dismiss({ act: 'cancel' });
  }

  ngOnDestroy(): void {

  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        'assigneeId': ['', [Validators.required]],
        'assignComments': ['', []],
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
    'assigneeId': {
      'required': '经办人不能为空',
    },
  };

}

