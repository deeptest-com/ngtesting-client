import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { TestCustomFieldService } from '../../../../../service/admin/test-custom-field';

@Component({
  selector: 'custom-field-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class CustomFieldList implements OnInit, AfterViewInit {

  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private customFieldService: TestCustomFieldService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/case-settings/custom-field/edit/null');
  }
  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/case-settings/custom-field/edit/' + item.id);
  }
  delete($event: any): void {
    console.log($event);
  }

  loadData() {
    this.customFieldService.list().subscribe((json: any) => {
      this.models = json.data;
    });
  }

  up(item: any) {
    this.customFieldService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.customFieldService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
