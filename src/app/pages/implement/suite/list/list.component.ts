import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CONSTANT } from '../../../../utils/constant';
import { WS_CONSTANT } from '../../../../utils/ws-constant';
import { GlobalState } from '../../../../global.state';
import { RouteService } from '../../../../service/route';
import { SuiteService } from '../../../../service/suite';

@Component({
  selector: 'nga-suite-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class SuiteListComponent implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'SuiteListComponent';
  orgId: number;
  prjId: number;
  projectName: string;

  models: any;
  collectionSize: number = 0;
  page:number = 1;
  pageSize:number = 2;

  queryForm: FormGroup;
  queryModel: any = { keywords: '' };
  statusMap: Array<any> = CONSTANT.ExeStatus;

  routeSub: any;
  myPrivs: any;

  constructor(private _state: GlobalState, private _route: ActivatedRoute, private _routeService: RouteService,
              private fb: FormBuilder, private el: ElementRef,
              private _suiteService: SuiteService) {

    this.queryForm = this.fb.group(
      {
        'keywords': ['', []],
      }, {},
    );

    this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);

      this.myPrivs = json.prjPrivileges;
      this.projectName = json.prjName;
    });
  }

  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
    this.projectName = CONSTANT.CURR_PRJ_NAME;
    this.myPrivs = CONSTANT.PRJ_PRIVILEGES;

    this.loadData();

    this.routeSub = this._route.pathFromRoot[5].params.subscribe(params => {
      if (this.prjId != +params['prjId']) {
        this.prjId = +params['prjId'];
        this.loadData();
      }
    });
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
        + '/implement/suite/null/edit');
  }

  delete(projectId: string): void {

  }

  loadData() {
    this._suiteService.query(this.queryModel, this.page, this.pageSize).subscribe((json: any) => {
      this.collectionSize = json.collectionSize;
      this.models = json.data;
    });
  }

  queryChange(values: any): void {
      this.loadData();
  }
  pageChange(event:any):void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}

