import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'issue-page-config',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-config.scss'],
  templateUrl: './page-config.html',
})
export class IssuePageConfig implements OnInit, AfterViewInit {
  id: number;

  page: any = { tabs: [] };
  fields: any[] = [];
  selectedFieldId: any;
  tab: any = {};
  form: FormGroup;

  draggingId: number = -1;

  listRecycled: Array<string> = [];

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;
  @ViewChild('tabset') tabset: NgbTabset;

  constructor(private elementRef: ElementRef, private _state: GlobalState,
              private _routeService: RouteService, private _route: ActivatedRoute,
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

  };

  loadData() {
    this.issuePageService.getDetail(this.id).subscribe((json: any) => {
      this.page = json.page;
      this.tab = this.page.tabs[0];
      this.fields = json.fields;
    });
  }

  addTab() {
    const tab = { name: '新标签', pageId: this.page.id };

    this.issuePageService.addTab(tab).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;

      this.page.tabs.push(this.tab);

      setTimeout(() => {
        this.tabset.select(this.tab.id + '');
      }, 10);
    });

  }

  addField() {
    const elem = this.fields.filter(el => el.id == this.selectedFieldId)[0];
    elem.tabId = this.tab.id;
    elem.pageId = this.page.id;

    elem.fieldId = elem.id;
    elem.id = null;
    elem.ordr = null;

    console.log(elem);

    this.issuePageService.addField(elem).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;
    });
  }

  selectTab($event, tab: any) {
    console.log('selectTab', tab);

    $event.preventDefault();
    this.issuePageService.getTab(tab.id).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;
    });
  }

  save() {
    this.issuePageService.save(this.page).subscribe((json: any) => {
      if (json.code == 1) {
        this.page = json.page;
        this.tab = this.page.tabs[0];
        this.fields = json.fields;

        this.formErrors = ['保存成功'];
      } else {
        this.formErrors = [json.msg];
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

  editTab($event, tab) {
    console.log('editTab', tab);
    tab.oldName = tab.name;
    tab.editing = true;
    $event.stopPropagation();
  }
  saveTabName($event, tab) {
    console.log('saveTabName', tab);
    tab.editing = false;
    $event.stopPropagation();
  }
  cancelTabName($event, tab) {
    console.log('cancelTabName', tab);
    tab.name = tab.oldName;
    tab.editing = false;
    $event.stopPropagation();
  }

  removeElem(elem) {
    console.log('removeElem', elem);
  }

  onTabDragStart(tab: any) {
    console.log('onTabDragStart', tab);
  }
  onTabDragEnd(tab) {
    console.log('onTabDragEnd', tab);
  }
  onTabDragSuccess(tab) {
    console.log('onTabDragSuccess', tab);
  }
  onTabDropSuccess(tab) {
    console.log('onTabDropSuccess', tab);
  }

  onElemDragStart(elem: any) {
    console.log('onElemDragStart', elem);
    this.draggingId = elem.id;
  }
  onElemDragEnd(elem) {
    console.log('onElemDragEnd', elem);
    this.draggingId = -1;
  }
  onElemDragSuccess(elem) {
    console.log('onElemDragSuccess', elem);
  }
  onElemDropSuccess(elem) {
    console.log('onElemDropSuccess', elem);
  }

  showModal($event): void {
    this.modalWrapper.showModal();
  }

}

