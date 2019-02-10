import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { WS_CONSTANT } from '../../../../utils/ws-constant';
import { Utils } from '../../../../utils/utils';
import { RouteService } from '../../../../service/route';
import { PlanService } from '../../../../service/client/plan';

@Component({
  selector: 'plan-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class PlanList implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'PlanList';

  orgId: number;
  prjId: number;
  projectName: string;

  models: any;
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 15;

  queryForm: FormGroup;
  queryModel: any = { keywords: '', status: '' };
  statusMap: Array<any> = CONSTANT.ExeStatus;

  myPrivs: any;

  constructor(private _state: GlobalState, private _route: ActivatedRoute, private _routeService: RouteService,
              private fb: FormBuilder, private el: ElementRef,
              private _planService: PlanService) {

    this.queryForm = this.fb.group(
      {
        'status': ['', []],
        'keywords': ['', []],
      }, {},
    );

    // this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
    //   console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);
    //
    //   this.myPrivs = json.prjPrivileges;
    //   this.projectName = json.prjName;
    // });
  }

  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
    this.projectName = CONSTANT.CURR_PRJ_NAME;
    this.myPrivs = CONSTANT.PRJ_PRIVILEGES;

    this.loadData();
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    const that = this;

    that._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
        + '/implement/plan/null/edit');
  }

  loadData() {
    this._planService.query(this.queryModel, this.page, this.pageSize).subscribe((json: any) => {
      this.collectionSize = json.total;
      this.models = json.data;
    });
  }

  queryChange(values: any): void {
      this.loadData();
  }
  pageChange(event: any): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}

