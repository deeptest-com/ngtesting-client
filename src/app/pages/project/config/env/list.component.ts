import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { Utils, logger } from '../../../../utils/utils';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouteService } from '../../../../service/route';
import { EnvService } from '../../../../service/client/env';

@Component({
  selector: 'env-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class ProjectEnvList implements OnInit, AfterViewInit {
  models: any[];
  projectId: number;
  queryForm: FormGroup;
  queryModel: any = { keywords: '', disabled: 'false' };
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  constructor(private _route: ActivatedRoute, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef, private _routeService: RouteService,
              private _envService: EnvService) {

    this._route.pathFromRoot[6].params.forEach(params => {
      this.projectId = +params['id'];
    });
    console.log('projectId', this.projectId);

    this.queryForm = this.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create() {
    const uri = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs/' + this.projectId
      + '/edit/env/null';
    this._routeService.navTo(uri);
  }

  edit(id: number): void {
    const uri = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs/' + this.projectId
      + '/edit/env/' + id;
    this._routeService.navTo(uri);
  }
  delete($event: any): void {
    const that = this;

    logger.log($event);
  }
  up(item: any) {
    this._envService.changeOrder(item.id, 'up').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this._envService.changeOrder(item.id, 'down').subscribe((json: any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    this._envService.list(this.queryModel).subscribe((json: any) => {
      this.models = json.data;
    });
  }

  gotoProject() {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + this.projectId + '/view');
  }

  queryChange(values: any): void {
    this.loadData();
  }

}
