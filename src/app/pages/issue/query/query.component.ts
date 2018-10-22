import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  ElementRef, Inject, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';
import { Utils } from '../../../utils/utils';
import { RouteService } from '../../../service/route';

import { ClientService } from '../../../service/client/client';
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
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 3;

  rule: any = {};
  checkedConditions: any = {};
  filters: any[] = [];
  columns: any[] = [];
  init = 0;

  layout: string = CONSTANT.PROFILE.issueView;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,
              private _tqlService: TqlService, private _issueService: IssueService,
              private _clientService: ClientService) {

    this.routeSub = this._activeRoute.params.subscribe(params => {
      this.rule = params['rule'];

      if (this.rule == 'all') {
        this.rule = {};
        this.loadData();
      } else {
        this.rule = JSON.parse(this.rule);
        this.loadData(this.init == 0);
      }

      CONSTANT.ISSUE_JQL = JSON.stringify(this.rule);
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

  pageChange(event: any): void {
    this.loadData();
  }

  loadData(init: boolean = true) {
    this._tqlService.query(this.rule, this.page, this.pageSize, init).subscribe((json: any) => {
      console.log('===', json);
      this.collectionSize = json.total;
      this.models = json.data;

      if (init) {
        this.init++;
        this.rule = json.rule;
        this.filters = json.filters;
        this.columns = json.columns;
      }
    });
  }

  search(data: any) {
    this.loadData(false);
  }
  changeColumns(data: any) {
    let columnsForShow = '';
    let i = 0;

    this.columns.forEach((it, index) => {
      if (it.display) {
        columnsForShow += (i++ == 0 ? it.code : ',' + it.code);
      }
    });

    this._tqlService.changeColumns(columnsForShow).subscribe((json: any) => {
      this.loadData(false);
    });
  }

  create(): void {

  }

  changeLayout(layout: string): void {
    this.layout = layout;

    this._clientService.setIssueView(layout).subscribe((json: any) => {
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
