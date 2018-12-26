import { Component, ViewEncapsulation, ViewChild, QueryList, Query } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { GlobalState } from '../../../../global.state';

import { CONSTANT, VARI, Utils } from '../../../../utils';
import { ValidatorUtils } from '../../../../validator/validator.utils';
import { RouteService } from '../../../../service/route';

import { PopDialogComponent } from '../../../../components/pop-dialog';

import { IssuePriorityService } from '../../../../service/client/issue-priority';

declare var jQuery;

@Component({
  selector: 'priority-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit.scss'],
  templateUrl: './edit.html',
})
export class ProjectPriorityEdit implements OnInit, AfterViewInit {
  orgId: number;
  projectId: number;
  model: any = {};
  models: any[] = [];

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private _priorityService: IssuePriorityService) {
    this.orgId = CONSTANT.CURR_ORG_ID;

    this._route.pathFromRoot[6].params.forEach(params => {
      this.projectId = +params['id'];
    });
    console.log('projectId', this.projectId);

    this.loadData();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {}

  loadData() {
    this._priorityService.getByProject().subscribe((json: any) => {
      this.model = json.model;
      this.models = json.models;
    });
  }

  change(solutionId) {
    this._priorityService.setByProject(solutionId).subscribe((json: any) => {
      this.model = json.model;
      this.models = json.models;
    });
  }

}

