import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueResolutionService } from '../../../../../service/admin/issue-resolution';

@Component({
  selector: 'issue-resolution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class IssueResolutionList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueResolutionService: IssueResolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-resolution/edit/null');
  }

  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-resolution/edit/' + item.id);
  }

  delete($event: any): void {

    console.log($event);
  }
  setDefault(item: any): void {
    this.issueResolutionService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    const that = this;

    that.issueResolutionService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

  up(item: any) {
    this.issueResolutionService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.issueResolutionService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
