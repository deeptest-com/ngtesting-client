import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { IssuePageService } from '../../../../../service/admin/issue-page';

@Component({
  selector: 'issue-page-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-list.scss'],
  templateUrl: './page-list.html',
})
export class IssuePageList implements OnInit, AfterViewInit {
  pages: any[];
  solutions: any[];

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private issuePageService: IssuePageService) {
  }

  ngOnInit() {
    const that = this;

    that.loadData();
  }

  ngAfterViewInit() {

  }

  editPage(item: any) {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-page/page-edit/'
      + (item ? item.id : null) );
  }

  loadData() {
    this.issuePageService.load().subscribe((json: any) => {
      this.pages = json.pages;
      this.solutions = json.solutions;
    });
  }

}
