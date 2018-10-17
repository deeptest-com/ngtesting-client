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
import { IssueService } from '../../../service/client/issue';

import { TqlService } from '../tql/src/tql.service';

@Component({
  selector: 'issue-query',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./query.scss'],
  templateUrl: './query.html',
})
export class IssueQuery implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueQuery';
  routeSub: any;

  orgId: number;
  prjId: number;

  models: any[];
  rule: any = {};
  checkedConditions: any = {};
  filters: any[];
  init = 0;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);
  leftWidth: number = CONSTANT.PROFILE.leftSizeDesign;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,
              private _tqlService: TqlService, private _issueService: IssueService) {

    this.routeSub = this._activeRoute.params.subscribe(params => {
      this.rule = params['rule'];

      if (this.rule == 'all') {
        this.rule = {};
        this.loadData();
      } else {
        this.rule = JSON.parse(this.rule);
        this.loadData(this.init++ == 0);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  queryChanged(data): void {
    this.rule = this._tqlService.buildRule(this.rule, this.filters, data);
    console.log('---queryChange ', this.rule);

    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
      + '/issue/query/' + JSON.stringify(this.rule);
    this._router.navigateByUrl(url);
  }

  loadData(init: boolean = true) {
    this._tqlService.query(this.rule, init).subscribe((json: any) => {
      console.log('===', json);
      this.models = json.data;

      if (init) {
        this.rule = json.rule;
        this.filters = json.filters;
      }
    });
  }

  search(data: any) {
    this.loadData(false);
  }

  create(): void {

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
