import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, ViewChild, Input, Output, EventEmitter, Injector, ElementRef } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CONSTANT } from '../../../../../../utils/constant';
import { Utils } from '../../../../../../utils/../utils';
import { ValidatorUtils } from '../../../../../../validator';

import { IssueWorkflowTransitionService } from '../../../../../../service/admin/issue-workflow-transition';

import * as _ from 'lodash';

@Component({
  selector: 'workflow-transition',
  templateUrl: './workflow-transition.html',
  styleUrls: ['./workflow-transition.scss'],
})
export class WorkflowTransitionComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() workflowId: number;
  @Input() srcId: number;
  @Input() dictId: number;
  @Input() projectRoles: any[];

  @Output() confirm = new EventEmitter<any>();

  form: FormGroup;
  model: any = {};

  constructor(private fb: FormBuilder, private host: ElementRef, public activeModal: NgbActiveModal,
              private tranService: IssueWorkflowTransitionService) {
    this.buildForm();

  }

  ngOnInit() {

  }

  dismiss(): any {
    this.activeModal.dismiss({ act: 'cancel' });
  }
  close(): any {
    this.activeModal.close({ act: 'close' });
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }

  save(): any {
    this.tranService.save(this.workflowId, this.srcId, this.dictId, this.projectRoles)
      .subscribe((json: any) => {
      if (json.code == 1) {
        this.activeModal.close({ act: 'save' } );
      }
    });
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  select(key: string) {
    const val = key === 'all' ? true : false;
    for (const item of this.projectRoles) {
      item.selected = val;
    }
  }

  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);
  }
  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
  };

}
