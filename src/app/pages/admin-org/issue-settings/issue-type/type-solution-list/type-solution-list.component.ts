import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssueTypeSolutionService } from '../../../../../service/admin/issue-type-solution';

@Component({
  selector: 'issue-type-solution-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./type-solution-list.scss'],
  templateUrl: './type-solution-list.html',
})
export class IssueTypeSolutionList implements OnInit, AfterViewInit {
  models: any[];

  constructor(private _routeService: RouteService, private _state: GlobalState, private fb: FormBuilder, private el: ElementRef,
              private issueTypeSolutionService: IssueTypeSolutionService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-type/type-solution-edit/null');
  }

  edit(item: any): void {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-type/type-solution-edit/' + item.id);
  }

  loadData() {
    const that = this;

    that.issueTypeSolutionService.list().subscribe((json: any) => {
      that.models = json.data;
    });
  }

}
