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
import { IssueLinkService } from '../../../../service/client/issue-link';

import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: 'issue-link',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./issue-link.scss'],
  templateUrl: './issue-link.html',
})
export class IssueLink implements OnInit, AfterViewInit, OnDestroy {
  issue: any = {};
  users: any[] = [];

  dictIssueId: number;
  reason: string;

  form: FormGroup;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder,
              public activeModal: NgbActiveModal, private issueLinkService: IssueLinkService) {
    this.buildForm();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  link() {
    this.issueLinkService.link(this.issue.id, this.dictIssueId, this.reason).subscribe((json: any) => {
      if (json.code == 1) {
        this.activeModal.close({ act: 'link', success: true });
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
        'linkId': ['', [Validators.required]],
        'linkComments': ['', []],
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
    'linkId': {
      'required': '经办人不能为空',
    },
  };

}

