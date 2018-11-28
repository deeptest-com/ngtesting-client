import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueCustomFieldService } from '../../../../../service/admin/issue-custom-field';

@Component({
  selector: 'issue-field-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class IssueFieldList implements OnInit, AfterViewInit {

  models: any[];
  inputMap: any = {};
  typeMap: any = {};

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private issueFieldService: IssueCustomFieldService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-field/edit/null');
  }
  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-field/edit/' + item.id);
  }
  delete($event: any): void {
    console.log($event);
  }

  loadData() {
    this.issueFieldService.list().subscribe((json: any) => {
      this.models = json.data;
      this.inputMap = json.inputMap;
      this.typeMap = json.typeMap;
    });
  }

  up(item: any) {
    this.issueFieldService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.issueFieldService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
