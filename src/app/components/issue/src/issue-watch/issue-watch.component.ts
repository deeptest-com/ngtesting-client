import { Component, ViewEncapsulation, Input, Pipe, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MyToastyService } from '../../../../service/my-toasty';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';
import { ValidatorUtils } from '../../../../validator/validator.utils';

import { RouteService } from '../../../../service/route';
import { IssueWatchService } from '../../../../service/client/issue-watch';

import { PrivilegeService } from '../../../../service/privilege';
import * as _ from 'lodash';
import { Utils } from '../../../../utils';
import { CustomValidator } from '../../../../validator';

declare var jQuery;

@Component({
  selector: 'issue-watch',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./issue-watch.scss'],
  templateUrl: './issue-watch.html',
})
export class IssueWatch implements OnInit, AfterViewInit, OnDestroy {
  issue: any = {};

  userId: number;
  users: any[] = [];

  searchModel: any = {};
  searchResult: any[];
  selectedModels: any[] = [];

  updated: boolean = false;

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              public activeModal: NgbActiveModal, private toastyService: MyToastyService,
              private issueWatchService: IssueWatchService, private privilegeService: PrivilegeService) {

  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {}

  loadData() {
    this.issueWatchService.list(this.issue.id).subscribe((json: any) => {
      this.users = json.data;
    });
  }

  batchWatch() {
    const ids = [];
    this.selectedModels.forEach(item => { ids.push(item.id); });

    this.issueWatchService.batchWatch(this.issue.id, ids).subscribe((json: any) => {
      if (json.code == 1) {
        // this.activeModal.close({ act: 'save', success: true });
        this.selectedModels = [];
        this.loadData();
        
        this.updated = true;
      }
    });
  }

  remove(item) {
    this.issueWatchService.remove(item.id, this.issue.id).subscribe((json: any) => {
      if (json.code == 1) {
        this.loadData();

        this.updated = true;
      }
    });
  }

  cancel() {
      this.activeModal.dismiss(this.updated ? { success: true } : { act: 'cancel' });
  }

  changeSearch(searchModel: any): void {
    const ids = [];
    this.selectedModels.forEach(item => { ids.push(item.id); });

    this.issueWatchService.search(this.issue.id, this.searchModel.keywords, ids).subscribe((json: any) => {
      if (json.code == 1) {
        this.searchResult = json.data;
        console.log('this.searchResult', this.searchResult);
      }
    });
  }

  ngOnDestroy(): void {

  }

}

