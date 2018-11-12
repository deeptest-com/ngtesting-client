import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssuePriorityService } from '../../../../../service/admin/issue-priority';

@Component({
  selector: 'issue-priority-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./priority-list.scss'],
  templateUrl: './priority-list.html',
})
export class IssuePriorityList implements OnInit, AfterViewInit {

  models: any;

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private issuePriorityService: IssuePriorityService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-priority/priority-edit/null');
  }
  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-priority/priority-edit/' + item.id);
  }

  delete($event: any): void {
    console.log($event);
  }
  setDefault(item: any): void {
    this.issuePriorityService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    this.issuePriorityService.list().subscribe((json: any) => {
      this.models = json.data;
    });
  }

  up(item: any) {
    this.issuePriorityService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this.issuePriorityService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

}
