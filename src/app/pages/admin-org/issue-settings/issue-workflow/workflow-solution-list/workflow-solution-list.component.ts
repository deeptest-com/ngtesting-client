import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueWorkflowSolutionService } from '../../../../../service/admin/issue-workflow-solution';

@Component({
  selector: 'issue-workflow-solution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-solution-list.scss'],
  templateUrl: './workflow-solution-list.html',
})
export class IssueWorkflowSolutionList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueWorkflowSolutionService: IssueWorkflowSolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-solution-edit/null');
  }

  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-solution-edit/' + item.id);
  }

  loadData() {
    const that = this;

    that.issueWorkflowSolutionService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

}
