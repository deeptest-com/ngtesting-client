import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueWorkflowService } from '../../../../../service/admin/issue-workflow';

@Component({
  selector: 'issue-workflow-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-list.scss'],
  templateUrl: './workflow-list.html',
})
export class IssueWorkflowList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueWorkflowService: IssueWorkflowService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-edit/null');
  }
  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-edit/' + item.id);
  }
  design(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-design/' + item.id);
  }

  loadData() {
    const that = this;

    that.issueWorkflowService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

}
