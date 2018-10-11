import { Component, ViewEncapsulation, ViewChild, QueryList, Query } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgModule, Pipe, OnInit, AfterViewInit, OnDestroy }      from '@angular/core';

import { CONSTANT } from '../../../utils/constant';
import { OrgService } from '../../../service/admin/org';
import { ReportService } from '../../../service/client/report';

declare var jQuery;

@Component({
  selector: 'org-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class OrgView implements OnInit, AfterViewInit, OnDestroy {
  id: number;

  org: any = {};
  plans: any[] = [];
  histories: any = {};

  chartData: any = {};
  routeSub: any;

  constructor(private _route: ActivatedRoute,
              private _orgService: OrgService, private _reportService: ReportService) {
    this.id = CONSTANT.CURR_ORG_ID;
  }
  ngOnInit() {
    this.routeSub = this._route.pathFromRoot[3].params.subscribe(params => {
      // console.log('===', params, params['orgId']);
       // if (this.id != +params['orgId']) {
         this.id = +params['orgId'];
         this.loadData();
       // }
     });
  }
  ngAfterViewInit() {

  }

  loadData() {
    if (!this.id) {
      return;
    }
    this._orgService.view(this.id).subscribe((json: any) => {
      this.org = json.org;
      this.plans = json.plans;
      this.histories = json.histories;
    });

    this._reportService.orgReport(this.id).subscribe((json: any) => {
      this.chartData = json.data;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}

