import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouteService } from '../../../../../service/route';
import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VerService } from '../../../../../service/ver';

@Component({
  selector: 'ver-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class ProjectVerList implements OnInit, AfterViewInit {
  models: any[];
  projectId: number;
  queryForm: FormGroup;
  queryModel:any = {keywords: '', disabled: 'false'};
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  constructor(private _route: ActivatedRoute, private _state: GlobalState, private fb: FormBuilder,
              private el: ElementRef, private _verService: VerService, private _routeService: RouteService) {

    this._route.params.subscribe(params => {
      this.projectId = +params['id'];
    });

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
      + '/edit/ver/null';
    this._routeService.navTo(uri);
  }

  edit(id: number): void {
    const uri = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs/' + this.projectId
      + '/edit/ver/' + id;
    this._routeService.navTo(uri);
  }
  delete($event: any): void {
    console.log($event);
  }
  up(item: any) {
    this._verService.changeOrder(item.id, 'up').subscribe((json:any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }
  down(item: any) {
    this._verService.changeOrder(item.id, 'down').subscribe((json:any) => {
      if (json.code == 1) {
        this.models = json.data;
      }
    });
  }

  loadData() {
    this._verService.list(this.queryModel).subscribe((json: any) => {
      this.models = json.data;
    });
  }

  queryChange(values: any): void {
    this.loadData();
  }

  gotoProjectList() {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prjs');
  }

}
