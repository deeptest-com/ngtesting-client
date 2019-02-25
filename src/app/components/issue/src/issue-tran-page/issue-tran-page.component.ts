import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { MyToastyService } from '../../../../service/my-toasty';

import { GlobalState } from '../../../../global.state';

import { RouteService } from '../../../../service/route';

import { IssuePageService } from '../../../../service/client/issue-page';
import { IssueOptService } from '../../../../service/client/issue-opt';
import { CONSTANT } from '../../../../utils';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorUtils } from '../../../../validator';

import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: '[issue-tran-page]',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./style.scss'],
  templateUrl: './issue-tran-page.html',
})
export class IssueTranPageComponent implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueTranPage';
  canEdit: boolean;

  form: any;
  validateMsg: any = {};

  @Input() page: any = {};
  @Output() optEvent = new EventEmitter<any>();

  issueTransMap: any = {};
  @Input() issue;
  @Input() tran;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, public activeModal: NgbActiveModal, private toastyService: MyToastyService,
              private issuePageService: IssuePageService, private issueOptService: IssueOptService) {

    this.issueTransMap = CONSTANT.ISU_TRANS_MAP;

    this.buildForm();
  }

  ngOnInit() {
    this.issuePageService.get(this.tran.actionPageId).subscribe((json: any) => {
      this.page = json.data;

      this.onValueChanged();
    });
  }

  ngAfterViewInit() {
  }

  statusTran(tran) {

  }

  update() {
    this.issueOptService.updateThenStatusTran(this.issue, this.tran).subscribe((json: any) => {
      if (json.code == 1) {
        this.activeModal.close({ act: 'tran', success: true });
      }
    });
  }

  cancel() {
    this.activeModal.dismiss({ act: 'cancel' });
  }

  ngOnDestroy(): void {

  }

  onValueChanged(data?: any) {
    console.log('onValueChanged');
    this.formErrors = ValidatorUtils.genMsg(this.form, this.validateMsg, []);
  }
  buildForm() {
    this.form = this.fb.group({});

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  formErrors = [];


}

