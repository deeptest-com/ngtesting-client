import { Component, ViewEncapsulation, ViewChild, Compiler } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils, CustomValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssueCustomFieldService } from '../../../../../service/admin/issue-custom-field';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

import { DropdownOptionsComponent } from '../../../../../components/dropdown-options';

declare var jQuery;

@Component({
  selector: 'issue-field-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class IssueFieldEdit implements OnInit, AfterViewInit {

  id: number;
  tab: string = 'info';

  model: any = { applyTo: 'test_case' };
  applyToList: string[];

  inputMap: any;
  typeList: any[];

  formatList: string[];

  form: FormGroup;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;
  public dropdownOptionsModal: any;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueFieldService: IssueCustomFieldService,
              private compiler: Compiler, private modalService: NgbModal) {

  }
  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });

    this.loadData();
    this.buildForm();
  }
  ngAfterViewInit() {}


  selectTab(tab: string) {
    const that = this;
    that.tab = tab;
  }

  buildForm(): void {
    this.form = this.fb.group(
      {
        label: ['', [Validators.required]],
        colCode: ['', [Validators.required]],
        type: ['', [Validators.required]],
        input: ['', [Validators.required]],
        rows: ['', [Validators.pattern('^[1-9]$'),
          CustomValidator.validate('required_if_other_is', 'required_rows', 'rows', 'type', 'text')]],
        format: ['', [CustomValidator.validate('required_if_other_is', 'required_format', 'format', 'type', 'text')]],
        descr: ['', []],
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
    'label': {
      'required': '名称不能为空',
    },
    'type': {
      'required': '取值类型不能为空',
    },
    'input': {
      'required': '控件类型不能为空',
    },
    'rows': {
      'pattern': '字段行数必须为1-9的整数',
      'required_rows': '字段行数不能为空',
    },
    'format': {
      'required_format': '字段格式不能为空',
    },
  };

  loadData() {
    this.issueFieldService.get(this.id).subscribe((json: any) => {
      this.model = json.data;

      this.applyToList = json.applyToList;
      this.formatList = json.formatList;

      this.inputMap = json.inputMap;

      if (!this.id) {
        this.model.input = _.values(this.inputMap)[0]['value'];

        this.typeList = this.inputMap[this.model.input].types;
        this.model.type = this.typeList[0].value;
      } else {
        this.typeList = this.inputMap[this.model.input].types;
      }
    });
  }

  save() {
    this.issueFieldService.save(this.model).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['保存成功'];
        this.back();
      } else {
        this.formErrors = [json.msg];
      }
    });
  }
  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-field/list');
  }

  delete() {
    const that = this;

    that.issueFieldService.delete(that.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  editDropdownOptions() {
    this.compiler.clearCacheFor(DropdownOptionsComponent);

    this.dropdownOptionsModal = this.modalService.open(DropdownOptionsComponent, { windowClass: 'pop-modal' });
    this.dropdownOptionsModal.componentInstance.title = this.model.label;
    this.dropdownOptionsModal.componentInstance.field = this.model;
    this.dropdownOptionsModal.componentInstance.applyTo = 'issue';

    this.dropdownOptionsModal.result.then((result) => {
      this.model = result.field;
    }, (reason) => {
      console.log('reason', reason);
    });
  }

  changeInput() {
    this.typeList = this.inputMap[this.model.input].types;
    this.model.type = this.inputMap[this.model.input].types[0].value;
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

