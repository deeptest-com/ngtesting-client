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
  form: FormGroup;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT + 70);

  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private elementRef: ElementRef, private _state: GlobalState, private fb: FormBuilder,
              private _routeService: RouteService, private _route: ActivatedRoute,
              private pageService: IssuePageService,
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
      this.fields = json.fields;
      this.issuePropMap = json.issuePropMap;
    });
  }

  save() {
    this.pageService.save(this.page).subscribe((json: any) => {
      if (json.code == 1) {
        this.page = json.page;
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

  onElementDropSuccess($event) {
    console.log('onFieldDropSuccess', $event);

    const elems: any[] = this.page.elements.map(function (item) {
      return { id: item.id, key: item.key };
    });

    this.elemService.saveAll(this.page.id, elems).subscribe((json: any) => {
      this.page = json.page;
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
