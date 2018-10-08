import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';
import { Utils } from '../../../utils/utils';
import { RouteService } from '../../../service/route';
import { IssueService } from '../../../service/issue';

@Component({
  selector: 'issue-query',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./query.scss'],
  templateUrl: './query.html',
})
export class IssueQuery implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueQuery';

  orgId: number;
  prjId: number;

  projects: any;
  maxLevel: number;
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  routeSub: any;
  myPrivs: any;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT + 46);
  leftWidth: number;

  constructor(private _route: ActivatedRoute, private router: Router, private _routeService: RouteService,
              private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef, private _issueService: IssueService) {
  }

  ngOnInit() {
    this.myPrivs = CONSTANT.PRJ_PRIVILEGES;

    this.leftWidth = CONSTANT.PROFILE.leftSizeIssue;

    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this.loadData();

    this.routeSub = this._route.pathFromRoot[5].params.subscribe(params => {
      if (this.prjId != +params['prjId']) {
        this.prjId = +params['prjId'];
        this.loadData();
      }
    });
    this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);

      this.myPrivs = json.prjPrivileges;
    });
  }

  ngAfterViewInit() {

  }

  create(): void {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + this.prjId
      + '/issue/null/edit');
  }

  queryChanged(): void {
    // this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + this.prjId
    //   + '/issue/query/' + this.filter + '/' + this.tql);
    console.log('queryChange 2', CONSTANT.ISSUE_TQL);
  }

  loadData() {
    // this._issueService.query(this.filter, this.query).subscribe((json: any) => {
    //   this.projects = json.data;
    // });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }
}
