import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { I18n } from '../../../../service/datepicker-I18n';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';

import { PlanService } from '../../../../service/client/plan';
import { TaskService } from '../../../../service/client/task';
import { ReportService } from '../../../../service/client/report';

import { PopDialogComponent } from '../../../../components/pop-dialog';

declare var jQuery;

@Component({
  selector: 'plan-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
  providers: [I18n],
})
export class PlanView implements OnInit, AfterViewInit {
  orgId: number;
  prjId: number;

  planId: number;
  model: any = {};
  form: any;

  testSet: any;
  modalTitle: string;

  chartData: any = {};
  profile: any;

  @ViewChild('modalClose') modalClose: PopDialogComponent;
  task: any = {};
  index: number;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute,
              private _reportService: ReportService,
              private _planService: PlanService, private _taskService: TaskService) {
    this.profile = CONSTANT.PROFILE;
  }
  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this._route.params.forEach((params: Params) => {
      this.planId = +params['planId'];
    });

    if (this.planId) {
      this.loadData();
      this._reportService.planReport(this.planId).subscribe((json: any) => {
        this.chartData = json.data;
      });
    }
  }
  ngAfterViewInit() {}

  loadData() {
    const that = this;
    that._planService.get(that.planId).subscribe((json: any) => {
      that.model = json.data;
    });
  }

  exeOrView(act: string, taskId: number) {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/plan/'
      + this.planId + '/execution/' + taskId + '/' + act);
  }

  close(task: any, index: number): void {
    this.modalTitle = task.name;
    this.task = task;
    this.index = index;
    this.modalClose.showModal();
  }
  closeConfirm() {
    this._taskService.close(this.task.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.model.tasks[this.index] = json.data;
        this.modalClose.closeModal();
      }
    });
  }

  returnTo() {
    const url: string = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/implement/plan/list';
    this._routeService.navTo(url);
  }

}

