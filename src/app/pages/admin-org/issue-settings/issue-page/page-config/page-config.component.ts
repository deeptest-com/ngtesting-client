import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { ValidatorUtils } from '../../../../../validator';
import { RouteService } from '../../../../../service/route';

import { IssuePageService } from '../../../../../service/admin/issue-page';
import { IssuePageTabService } from '../../../../../service/admin/issue-page-tab';
import { IssuePageElemService } from '../../../../../service/admin/issue-page-elem';

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
  issuePropMap: any = {};
  tab: any = {};
  form: FormGroup;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT + 70);

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;
  @ViewChild('tabset') tabset: NgbTabset;

  constructor(private elementRef: ElementRef, private _state: GlobalState, private fb: FormBuilder,
              private _routeService: RouteService, private _route: ActivatedRoute,
              private pageService: IssuePageService,
              private tabService: IssuePageTabService,
              private elemService: IssuePageElemService) {

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
    this.pageService.getDetail(this.id).subscribe((json: any) => {
      this.page = json.page;
      this.tab = this.page.tabs[0];
      this.fields = json.fields;
      this.issuePropMap = json.issuePropMap;
    });
  }

  save() {
    this.pageService.save(this.page).subscribe((json: any) => {
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
    this.pageService.delete(this.page.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.formErrors = ['删除成功'];
        this.modalWrapper.closeModal();
        this.back();
      } else {
        this.formErrors = ['删除失败'];
      }
    });
  }

  selectTab($event, tab: any) {
    console.log('selectTab', tab);

    $event.preventDefault();
    this.tabService.get(tab.id).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;
    });

    this.formErrors = [];
  }

  addTab() {
    const tab = { name: '新标签', pageId: this.page.id };

    this.tabService.add(tab).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;

      this.page.tabs.push(this.tab);
    });

    this.formErrors = [];
  }

  editTab($event, tab) {
    console.log('editTab', tab);
    tab.oldName = tab.name;
    tab.editing = true;

    this.formErrors = [];
    $event.stopPropagation();
  }
  removeTab($event, tab) {
    console.log('removeTab', tab);

    this.tabService.remove(tab.id, tab.pageId, this.tab.id).subscribe((json: any) => {
      if (json.code != 1) {
        this.formErrors = [json.msg];
        return;
      }

      this.page = json.page;

      if (this.tab.id == tab.id) {
        this.tab = this.page.tabs[0];
        this.fields = json.fields;
      } else {
        this.tab = this.page.tabs.filter(el => el.id == this.tab.id)[0];
      }
    });
  }
  updateTabName($event, tab) {
    $event.stopPropagation();
    console.log('saveTabName', tab);

    tab.editing = false;

    this.tabService.updateName(tab.id, tab.name).subscribe((json: any) => {
      tab.editing = false;
    });
  }
  cancelTabName($event, tab) {
    console.log('cancelTabName', tab);
    tab.name = tab.oldName;
    tab.editing = false;
    $event.stopPropagation();
  }

  onTabDropSuccess(tab) {
    console.log('onTabDropSuccess', tab);
  }

  onElementDropSuccess($event) {
    console.log('onFieldDropSuccess', $event);

    const elems: any[] = this.tab.elements.map(function (item) {
      return { id: item.id, key: item.key };
    });

    this.elemService.saveAll(this.page.id, this.tab.id, elems).subscribe((json: any) => {
      this.tab = json.tab;
      this.fields = json.fields;
    });

    this.formErrors = [];
  }

  setProp($event: any) {
    console.log('$event', $event);

    this.elemService.updateProp($event).subscribe((json: any) => {
    });
    this.formErrors = [];
  }

  showModal($event): void {
    this.modalWrapper.showModal();
  }

}
