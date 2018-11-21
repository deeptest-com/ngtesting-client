import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';

import { IssueWorkflowSolutionService } from '../../../../../service/admin/issue-workflow-solution';

declare var jQuery;

@Component({
  selector: 'issue-workflow-solution-config',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./workflow-solution-config.scss'],
  templateUrl: './workflow-solution-config.html',
})
export class IssueWorkflowSolutionConfig implements OnInit, AfterViewInit {
  id: number;

  solution: any = {};
  itemMap: any = {};
  workflows: any[] = [];

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private solutionService: IssueWorkflowSolutionService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
  }
  ngAfterViewInit() {}

  loadData() {
    this.solutionService.getConfig(this.id).subscribe((json: any) => {
      this.solution = json.solution;
      this.itemMap = json.itemMap;
      this.workflows = json.workflows;
    });
  }

  change(type, workflow) {
    console.log(type, workflow);

    this.solutionService.changeItem(type, workflow, this.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.solution = json.solution;
        this.itemMap = json.itemMap;
        this.workflows = json.workflows;
      }
    });
  }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-workflow/workflow-solution-list');
  }

}
