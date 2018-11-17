import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GlobalState } from '../../../global.state';
import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';
import { Utils } from '../../../utils/utils';
import { RouteService } from '../../../service/route';
import { IssueQueryService } from '../../../service/client/issue-query';
import {PopDialogComponent} from "../../../components/pop-dialog";

@Component({
  selector: 'issue-query-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class IssueQueryList implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueQueryList';

  models: any;
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 15;

  queryForm: FormGroup;
  queryModel: any = { keywords: '' };

  model: any = {};

  @ViewChild('modalDelete') modalDelete: PopDialogComponent;

  constructor(private _state: GlobalState, private _route: ActivatedRoute, private _routeService: RouteService,
              private fb: FormBuilder, private el: ElementRef,
              private _issueQueryService: IssueQueryService) {

    this.queryForm = this.fb.group(
      {
        'status': ['', []],
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

  view(id: number) {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue/query/q_' + id;
    this._routeService.navTo(url);
  }

  edit(id: number) {
    const url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID + '/issue-query/' + id + '/edit';
    this._routeService.navTo(url);
  }

  deleteConfirm(item): void {
    this.model = item;
    this.modalDelete.showModal();
  }

  delete() {
    this._issueQueryService.delete(this.model.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.loadData();
        this.modalDelete.closeModal();
      }
    });
  }

  loadData() {
    this._issueQueryService.list(this.queryModel, this.page, this.pageSize).subscribe((json: any) => {
      this.collectionSize = json.total;
      this.models = json.data;
    });
  }

  queryChange(values: any): void {
      this.loadData();
  }
  pageChange(event: any): void {
    this.loadData();
  }

  ngOnDestroy(): void {

  }

}

