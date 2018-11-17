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
  @Input() model: any = {};
  @Input() projectRoles: any[];
  @Input() pages: any[];

  @Output() confirm = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private host: ElementRef, public activeModal: NgbActiveModal,
              private tranService: IssueWorkflowTransitionService) {
    this.buildForm();
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }

  loadData(): any {
    this.tranService.get(this.model).subscribe((json: any) => {
      this.model = json.data;
      this.projectRoles = json.projectRoles;
    });
  }

  save(): any {
    this.tranService.save(this.model, this.projectRoles)
      .subscribe((json: any) => {

        this.model = json.data;
        if (json.code == 1) {
          this.activeModal.close({ act: 'save', model: this.model } );
        }
    });
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        actionPageId: ['', []],
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

  dismiss(): any {
    this.activeModal.dismiss({ act: 'cancel' });
  }
  close(): any {
    this.activeModal.close({ act: 'close' });
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
