import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { CustomFieldService } from '../../../../../service/admin/custom-field';

@Component({
  selector: 'custom-field-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class CustomFieldList implements OnInit, AfterViewInit {

  models: any[];
  inputMap: any = {};
  typeMap: any = {};

  module: string;
  queryForm: FormGroup;
  queryModel: any = {};
  applies: any = CONSTANT.FieldApplyTo;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder, private el: ElementRef,
              private customFieldService: CustomFieldService) {

    this._route.params.forEach((params: Params) => {
      this.queryModel.applyTo = params['applyTo'];
    });
    if (this.queryModel.applyTo == 'issue') {
      this.module = 'issue';
    } else {
      this.module = 'case';
    }

    this.loadData();

    this.queryForm = this.fb.group(
      {
        'applyTo': ['', []],
        'keywords': ['', []],
      }, {},
    );
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    this.toEdit(null);
  }
  edit(item: any): void {
    this.toEdit(item.id);
  }

  queryChange(values): void {
    const url = '/pages/org-admin/' +
      this.module + '-settings/' + this.module + '-field/list/' + this.queryModel.applyTo;
    this._routeService.navTo(url);
    this.loadData();
  }

  loadData() {
    this.customFieldService.list(this.queryModel).subscribe((json: any) => {
      this.models = json.data;
      this.inputMap = json.inputMap;
      this.typeMap = json.typeMap;
    });
  }

  up(item: any) {
    this.customFieldService.changeOrder(item.id, 'up', this.queryModel).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.customFieldService.changeOrder(item.id, 'down', this.queryModel).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  toEdit(id: string) {
    const url = '/pages/org-admin/' +
      this.module + '-settings/' + this.module + '-field/edit/' + id + '/' + this.queryModel.applyTo;
    console.log('====', url);
    this._routeService.navTo(url);
  }

}
