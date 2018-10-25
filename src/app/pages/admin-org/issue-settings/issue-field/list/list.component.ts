import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueFieldService } from '../../../../../service/admin/issue-field';

@Component({
  selector: 'issue-field-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class IssueFieldList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueFieldService: IssueFieldService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-field/edit/null');
  }

  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-field/edit/' + item.id);
  }

  setDefault(item: any): void {
    this.issueFieldService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    const that = this;

    that.issueFieldService.list().subscribe((json: any) => {
      that.models = json.data;
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
