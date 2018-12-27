import {
  Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  ElementRef, Inject, Renderer2, ViewChild, Input
} from '@angular/core';
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
import { IssueQueryService } from './query.service';
import {PopDialogComponent} from "../../../components/pop-dialog";

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
  pageSize: number = 20;

  queryName: string;
  rule: any = {};
  orderBy: any[] = [];
  checkedConditions: any = {};
  filters: any[] = [];
  issuePropMap: any = {};
  issuePropValMap: any = {};
  columns: any[] = [];
  init: boolean = true;

  orderColumn: string;
  orderSeq: string;

  batchModel: boolean = false;

  layout: string = CONSTANT.PROFILE.issueView;
  @ViewChild('modalWrapper') modalWrapper: PopDialogComponent;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, private _routeService: RouteService,
              private _tqlService: TqlService, private _clientService: ClientService,
              private _queryService: IssueQueryService, private _issueService: IssueService) {

    this.routeSub = this._activeRoute.params.subscribe(params => {
      const ruleStr = params['rule'];
      const orderByStr = params['orderBy'];

      if (ruleStr == 'all') {
        this.init = true;
        this.rule = {};

        this.loadData();
      } else if (ruleStr == 'lastest') {
        this.init = true;

        const ruleStore = localStorage.getItem('issue_query');
        const orderByStore = localStorage.getItem('order_by_for_' + this.layout);
        if (!ruleStore) {
          this.rule = {};
        } else {
          this.rule = JSON.parse(ruleStore);
        }
        if (!orderByStore) {
          this.orderBy = [];
        } else {
          this.orderBy = JSON.parse(orderByStore);
        }

        this.updateForBrowse();
        this.loadData();
      } else if (ruleStr.startsWith('q_')) {
        this.init = true;

        this.loadDataByQueryId(this.rule.split('_')[1]);
      } else {
        localStorage.setItem('issue_query', ruleStr);
        localStorage.setItem('order_by_for_' + this.layout, orderByStr);

        this.rule = JSON.parse(ruleStr);
        this.orderBy = JSON.parse(orderByStr);
        this.loadData();
      }

      CONSTANT.ISSUE_JQL = JSON.stringify(this.rule);
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  conditionChange(newRole): void {
    this.rule = this._tqlService.buildRule(this.rule, newRole);

    console.log('conditionChange in query', this.rule);
  }

  pageChange(event: any): void {
    this.loadData();
  }

  loadData() {
    this._tqlService.query(this.rule, this.orderBy, this.page, this.pageSize, this.init).subscribe((json: any) => {
      console.log('===', json);
      this.collectionSize = json.total;
      this.models = json.data;

      if (this.init) {
        this.init = false;
        this.rule = json.rule;
        this.filters = json.filters;
        this.orderBy = json.orderBy;
        this.columns = json.columns;
        this.issuePropMap = json.issuePropMap;
        this.issuePropValMap = json.issuePropValMap;

        this.updateForBrowse();
      }
    });
  }

  loadDataByQueryId(queryId: number) {
    this._tqlService.queryById(queryId, this.page, this.pageSize, this.init).subscribe((json: any) => {
      this.collectionSize = json.total;
      this.models = json.data;

      this.rule = json.rule;

      if (this.init) {
        this.init = false;
        this.filters = json.filters;
        this.columns = json.columns;
        this.issuePropMap = json.issuePropMap;
        this.issuePropValMap = json.issuePropValMap;
      }
    });
  }

  search(data: any) {
    this.goto();
  }

  changeColumns() {
    let columnsForShow = '';
    let i = 0;

    this.columns.forEach((it, index) => {
      if (it.display) {
        columnsForShow += (i++ == 0 ? it.code : ',' + it.code);
      }
    });

    this._tqlService.changeColumns(columnsForShow).subscribe((json: any) => {
      this.loadData();
    });
  }

  reOrder(orderBy) {
    this.orderBy = orderBy;
    console.log('reOrder', this.orderBy);

    this.goto();
  }

  columnReOrder() {
    console.log('columnReOrder');
    this.changeColumns();
  }

  changeOrderSeq(seq?) {
    if (seq) { this.orderSeq = seq; }

    const map = { key: this.orderColumn, val: this.orderSeq };
    this.orderBy = [map];
    this.goto();
  }

  changeLayout(layout: string): void {
    this.layout = layout;

    this._clientService.setIssueView(layout).subscribe((json: any) => {
    });
  }

  create() {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/create';
    this._routeService.navTo(url);
  }

  showModal(): void {
    this.modalWrapper.showModal();
  }

  addToFavorites(): void {
    this._queryService.addToFavorites(this.queryName, this.rule).subscribe((json: any) => {
      this.modalWrapper.closeModal();
    });
  }

  changeModel() {
    this.batchModel = !this.batchModel;
  }

  dealWithIssue($event) {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/'
      + $event.item.id + '/' + $event.act;
    console.log('dealWithIssue', url);
    this._routeService.navTo(url);
  }

  selectAll() {
    this.models.forEach(item => {
      item.batchSelected = true;
    });
  }
  selectNone() {
    this.models.forEach(item => {
      item.batchSelected = false;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  goto(): void {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
      + '/issue/query/' + JSON.stringify(this.rule) + '/' + JSON.stringify(this.orderBy);
    console.log('url=', this.orderBy, url);
    this._router.navigateByUrl(url);
  }

  updateForBrowse(): void {
    if (this.orderBy.length > 0) {
      this.orderColumn = this.orderBy[0].key;
      this.orderSeq = this.orderBy[0].val;
    }

    console.log('updateForBrowse', this.orderBy, this.orderColumn, this.orderSeq);
  }
}
