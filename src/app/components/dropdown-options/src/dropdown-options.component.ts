import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, ViewChild, Input, Output, EventEmitter, Injector, ElementRef } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';
import { ValidatorUtils } from '../../../validator';

import { TestCustomFieldOptionService } from '../../../service/admin/test-custom-field-option';
import { IssueCustomFieldOptionService } from '../../../service/admin/issue-custom-field-option';

import * as _ from 'lodash';

@Component({
  selector: 'dropdown-options',
  templateUrl: './dropdown-options.html',
  styleUrls: ['./dropdown-options.scss'],
})
export class DropdownOptionsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() title: string;
  @Output() confirm = new EventEmitter<any>();

  @Input() field: any;
  @Input() applyTo: string = 'test';
  @Input() height: number;

  form: FormGroup;
  model: any = {};
  optionOrdr: number = 10;
  service: any;

  constructor(private fb: FormBuilder, private host: ElementRef, public activeModal: NgbActiveModal,
              private testCustomFieldOptionService: TestCustomFieldOptionService,
              private issueCustomFieldOptionService: IssueCustomFieldOptionService) {
    this.buildForm();

  }

  ngOnInit() {
    if (this.applyTo === 'issue') {
      this.service = this.issueCustomFieldOptionService;
    } else {
      this.service = this.testCustomFieldOptionService;
    }
  }

  dismiss(): any {
    this.activeModal.dismiss({ act: 'cancel' });
  }
  close(): any {
    this.activeModal.close({ act: 'close', field: this.field });
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }

  edit(item: any) {
    this.model = _.clone(item);
  }
  cancel(item: any) {
    this.form.reset();
    this.model = {};
  }
  save(): any {
    // if (this.field.id) {
      this.service.save(this.model, this.field).subscribe((json: any) => {
        if (json.code == 1) {
          this.form.reset();
          this.model = {};

          if (json.field) {
            this.field = json.field;
          }
          this.field.options = json.data;
        }
      });
    // } else {
    //   this.model.ordr = this.optionOrdr;
    //   this.optionOrdr += 10;
    //   this.field.options[this.field.options.length] = _.clone(this.model);
    //
    //   this.form.reset();
    //   this.model = {};
    // }
  }
  delete(item: any) {
    this.service.delete(item.id, this.field.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.form.reset();
        this.model = {};
        this.field.options = json.data;
      }
    });
  }
  changeOrder(item: any, act: string, idx: number) {
    // if (!item.id) { // 未保存
    //   Utils.changeOrder(this.field.options, act, idx);
    // } else {
      this.service.changeOrder(item.id, act, this.field.id).subscribe((json: any) => {
        if (json.code == 1) {
          this.model = {};
          this.field.options = json.data;
        }
      });
    // }
  }

  setDefault(item: any): void {
    this.service.setDefault(item.id, this.field.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.form.reset();
        this.model = {};
        this.field.options = json.data;
      }
    });
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        label: ['', [Validators.required]],
        value: ['', [Validators.required]],
      }, {},
    );

    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    const that = this;
    that.formErrors = ValidatorUtils.genMsg(that.form, that.validateMsg, []);
  }
  formErrors = [];
  validateMsg = {
    'value': {
      'required': '取值不能为空',
    },
    'label': {
      'required': '名称不能为空',
    },
  };

}
