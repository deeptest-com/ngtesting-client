import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgModule, Pipe, OnInit, AfterViewInit }      from '@angular/core';

import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';

import { IssuePageSolutionService } from '../../../../../service/admin/issue-page-solution';

declare var jQuery;

@Component({
  selector: 'issue-page-solution-config',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-solution-config.scss'],
  templateUrl: './page-solution-config.html',
})
export class IssuePageSolutionConfig implements OnInit, AfterViewInit {

  id: number;

  solution: any = { tabs: [] };
  form: FormGroup;

  constructor(private _state: GlobalState, private _routeService: RouteService, private _route: ActivatedRoute,
              private fb: FormBuilder, private solutionService: IssuePageSolutionService) {

  }
  ngOnInit() {
    this._route.params.forEach(params => {
      this.id = +params['id'];
    });

    this.loadData();
  }
  ngAfterViewInit() {}

  formErrors = [];
  validateMsg = {
    'name': {
      'required': '名称不能为空',
    },
  };

  loadData() {
    this.solutionService.get(this.id).subscribe((json: any) => {
      this.solution = json.solution;
    });
  }

  save() {
    this.solutionService.save(this.solution).subscribe((json: any) => {
      if (json.code == 1) {
        this.solution = json.solution;

        this.formErrors = ['保存成功'];

        this.back();
      } else {
        this.formErrors = [json.msg];
      }
    });
  }

  back() {
    this._routeService.navTo('/pages/org-admin/issue-settings/issue-page/page-solution-list');
  }

}
