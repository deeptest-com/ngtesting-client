import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils, PhoneValidator } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssuePageService } from '../../../../../service/admin/issue-page';
import { PopDialogComponent } from '../../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'issue-page-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-edit.scss'],
  templateUrl: './page-edit.html',
})
export class IssuePageEdit implements OnInit, AfterViewInit {

  id: number;

  page: any = { tabs: [] };
  fields: any[] = [];
  selectedField: any;
  tab: any = {};
  form: FormGroup;

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;
  @ViewChild('tabset') tabset: NgbTabset;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private issuePageService: IssuePageService) {

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
        'field': ['', []],
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
    this.issuePageService.get(this.id).subscribe((json: any) => {
      this.page = json.page;
      this.tab = this.page.tabs[0];
      this.fields = json.fields;
    });
  }

  addField() {
    console.log('addField');
  }
  addTab() {
    const tab = { id: (Math.abs(this.page.tabs[this.page.tabs.length-1].id) + 1) * -1, name: '新标签' };
    this.page.tabs.push(tab);

    this.tab = tab;

    setTimeout(() => {
      this.tabset.select(this.tab.id + '');
    }, 10);
  }
  tabChange(tabId: any) {
    this.tab = this.page.tabs.filter(el => el.id == tabId)[0];

    console.log('tabChange', this.tab);
  }

  save() {
    const that = this;

    that.issuePageService.save(that.page).subscribe((json: any) => {
      if (json.code == 1) {
        CONSTANT.CASE_PROPERTY_MAP = json.issuePropertyMap;

        that.formErrors = ['保存成功'];
        this.back();
      } else {
        that.formErrors = [json.msg];
      }
    });
  }
  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-page/page-list');
  }

  delete() {
    const that = this;

    that.issuePageService.delete(that.page.id).subscribe((json: any) => {
      if (json.code == 1) {
        that.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        that.formErrors = ['删除失败'];
      }
    });
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

}

