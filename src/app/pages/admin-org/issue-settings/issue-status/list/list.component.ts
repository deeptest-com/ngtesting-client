import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueStatusService } from '../../../../../service/admin/issue-status';

@Component({
  selector: 'issue-status-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class IssueStatusList implements OnInit, AfterViewInit {
  models: any;

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueStatusService: IssueStatusService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-status/edit/null');
  }

  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-status/edit/' + item.id);
  }

  delete($event: any): void {

    console.log($event);
  }

  loadData() {
    const that = this;

    that.issueStatusService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

  up(item: any) {
    this.issueStatusService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.issueStatusService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  setDefault(item: any): void {
    this.issueStatusService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
