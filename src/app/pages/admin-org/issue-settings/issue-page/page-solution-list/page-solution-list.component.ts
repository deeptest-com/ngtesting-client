import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssuePageSolutionService } from '../../../../../service/admin/issue-page-solution';

@Component({
  selector: 'issue-page-solution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-solution-list.scss'],
  templateUrl: './page-solution-list.html',
})
export class IssuePageSolutionList implements OnInit, AfterViewInit {
  pages: any[];
  solutions: any[];

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private solutionService: IssuePageSolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  editSolution(item: any) {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-page/page-solution-edit/'
      + (item ? item.id : null) );
  }
  configSolution(item: any) {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-page/page-solution-config/' + item.id);
  }

  loadData() {
    this.solutionService.load().subscribe((json: any) => {
      this.solutions = json.solutions;
    });
  }

}
