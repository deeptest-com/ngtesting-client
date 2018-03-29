import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { I18n, CustomDatepickerI18n } from '../../../../service/datepicker-I18n';

import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';

import { SuiteService } from '../../../../service/suite';

declare var jQuery;

@Component({
  selector: 'nga-suite-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class SuiteViewComponent implements OnInit, AfterViewInit {
  orgId: number;
  prjId: number;

  suiteId: number;

  model: any = {};
  form: any;

  testSet: any;
  modalTitle: string;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute,
              private _suiteService: SuiteService) {

  }
  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.suiteId = +params['suiteId'];
    });

    if (this.suiteId) {
      this.loadData();
    }
  }
  ngAfterViewInit() {}

  loadData() {
    this._suiteService.get(this.suiteId).subscribe((json: any) => {
      this.model = json.data;
    });
  }

  exeOrView(runId: number) {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID
      + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/suite/' + this.suiteId + '/execution/' + runId);
  }

  returnTo() {
    const url: string = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/suite/list';
    this._routeService.navTo(url);
  }

}
