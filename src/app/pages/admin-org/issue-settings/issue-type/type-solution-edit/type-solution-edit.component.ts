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

import { IssueTypeSolutionService } from '../../../../../service/admin/issue-type-solution';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-type-solution-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./type-solution-edit.scss'],
  templateUrl: './type-solution-edit.html',
})
export class IssueTypeSolutionEdit implements OnInit, AfterViewInit {

  id: number;

  model: any = {};
  otherItems: any[] = [];
  form: FormGroup;

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issueTypeSolutionService: IssueTypeSolutionService) {

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
    const that = this;
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
    this.issueTypeSolutionService.get(this.id).subscribe((json: any) => {
      this.model = json.data;
      this.otherItems = json.otherItems;
    });
  }

  save() {
    const that = this;

    that.issueTypeSolutionService.save(that.model).subscribe((json: any) => {
      if (json.code == 1) {
        CONSTANT.CASE_PROPERTY_MAP = json.issuePropertyMap;

        that.formErrors = ['保存成功'];
        this.back();
      } else {
        that.formErrors = [json.msg];
      }
    });
  }

  delete() {
    this.issueTypeSolutionService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  addType (item) {
    console.log('add', item);

    this.issueTypeSolutionService.addType(item.id, this.id).subscribe((json: any) => {
      this.model = json.data;
      this.otherItems = json.otherItems;
    });
  }

  removeType(item) {
    console.log('remove', item);

    this.issueTypeSolutionService.removeType(item.id, this.id).subscribe((json: any) => {
      this.model = json.data;
      this.otherItems = json.otherItems;
    });
  }

  addAll () {
    this.issueTypeSolutionService.addAll(this.id).subscribe((json: any) => {
      this.model = json.data;
      this.otherItems = json.otherItems;
    });
  }
  removeAll() {
    this.issueTypeSolutionService.removeAll(this.id).subscribe((json: any) => {
      this.model = json.data;
      this.otherItems = json.otherItems;
    });
  }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-type/type-solution-list');
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

