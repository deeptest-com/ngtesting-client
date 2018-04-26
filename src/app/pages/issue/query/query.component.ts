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
  orgId: number;
  prjId: number;
  filter: number;
  tql: string = 'all';
  query: any = { keywords: '', disabled: 'false' };

  projects: any;
  maxLevel: number;
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  isInit: boolean = false;

  constructor(private _route: ActivatedRoute, private router: Router, private _routeService: RouteService,
              private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef, private _issueService: IssueService) {

    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.filter = +params['filter'];
      this.tql = params['tql'];

      this.query = this.buildQuery(this.tql);
      this.loadData();
    });
  }

  ngOnInit() {
    this.isInit = false;
    this.loadData();
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
    console.log('queryChange 2', this.query);
  }

  loadData() {
    this._issueService.query(this.filter, this.query).subscribe((json: any) => {
      this.projects = json.data;
      this.isInit = true;
    });
  }
  buildQuery(tql: string) {
    return {};
  }

  ngOnDestroy(): void {

  }
}
