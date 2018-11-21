import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueWorkflowSolutionService } from '../../../../../service/admin/issue-workflow-solution';

@Component({
  selector: 'issue-Module-solution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-solution-list.scss'],
  templateUrl: './workflow-solution-list.html',
})
export class IssueWorkflowSolutionList implements OnInit, AfterViewInit {
  Modules: any[];
  solutions: any[];

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private solutionService: IssueWorkflowSolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  editSolution(item: any) {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-solution-edit/'
      + (item ? item.id : null) );
  }
  configSolution(item: any) {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-solution-config/' + item.id);
  }

  setDefault(item: any): void {
    this.solutionService.setDefault(item.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.solutions = json.solutions;
      }
    });
  }

  loadData() {
    this.solutionService.load().subscribe((json: any) => {
      this.solutions = json.solutions;
    });
  }

}
