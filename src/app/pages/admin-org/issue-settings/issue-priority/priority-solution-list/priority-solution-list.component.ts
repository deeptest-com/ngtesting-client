import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssuePrioritySolutionService } from '../../../../../service/admin/issue-priority-solution';

@Component({
  selector: 'issue-priority-solution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./priority-solution-list.scss'],
  templateUrl: './priority-solution-list.html',
})
export class IssuePrioritySolutionList implements OnInit, AfterViewInit {

  models: any = [];

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private issuePrioritySolutionService: IssuePrioritySolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-priority/priority-solution-edit/null');
  }
  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-priority/priority-solution-edit/' + item.id);
  }

  delete($event: any): void {
    console.log($event);
  }

  loadData() {
    this.issuePrioritySolutionService.list().subscribe((json: any) => {
      this.models = json.data;
    });
  }

}
