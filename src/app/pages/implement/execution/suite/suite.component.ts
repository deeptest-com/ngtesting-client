import { Component, ViewEncapsulation, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { RouteService } from '../../../../service/route';
import { SlimLoadingBarService } from '../../../../components/ng2-loading-bar';
import { TaskService } from '../../../../service/task';
import { CaseService } from '../../../../service/case';
import { CaseInTaskService } from '../../../../service/case-in-task';
import {Task} from "protractor/built/taskScheduler";

@Component({
  selector: 'execution-suite',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./suite.scss',
    '../../../../../assets/vendor/ztree/css/zTreeStyle/zTreeStyle.css',
    '../../../../components/ztree/src/styles.scss'],
  templateUrl: './suite.html',
})
export class ExecutionSuite implements OnInit, AfterViewInit {
  orgId: number;
  projectId: number;
  taskId: number;

  @Input() act: string;

  public treeModel: any;
  public treeSettings: any = { usage: 'exe', isExpanded: true, sonSign: false };

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private _taskService: TaskService, private _caseInTaskService: CaseInTaskService,
              private slimLoadingBarService: SlimLoadingBarService) {

  }

  ngOnInit() {
    if (this.act == 'view') {
      this.treeSettings.readonly = true;
    }

    this._route.params.forEach((params: Params) => {
      this.taskId = +params['taskId'];
    });

    this.orgId = CONSTANT.CURR_ORG_ID;
    this.projectId = CONSTANT.CURR_PRJ_ID;
    this.loadData();
  }

  ngAfterViewInit() {

  }

  loadData() {
    this.startLoading();

    this._caseInTaskService.query(this.taskId).subscribe((json: any) => {
      this.treeModel = json.data;

      CONSTANT.CASE_TYPES_FOR_PROJECT = json.caseTypeList;
      CONSTANT.CASE_PRIORITIES_FOR_PROJECT = json.casePriorityList;
      CONSTANT.CUSTOM_FIELD_FOR_PROJECT = json.customFields;

      this.completeLoading();
    });

  }
  startLoading() {
    this.slimLoadingBarService.start(() => {
      console.log('Loading complete');
    });
  }
  completeLoading() {
    const that = this;
    setTimeout(function () {
      that.slimLoadingBarService.complete();
    }, 500);
  }

  rename(event: any) {
    const testCase = event.data;
    this._caseInTaskService.rename(this.projectId, this.taskId, testCase).subscribe((json: any) => {
      event.deferred.resolve(json.data);
    });
  }

}

