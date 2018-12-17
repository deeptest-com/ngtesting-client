import { Component, ViewEncapsulation, Input, Pipe, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../global.state';
import { Utils } from '../../../../utils';

import { CONSTANT } from '../../../../utils/constant';
import { ValidatorUtils } from '../../../../validator/validator.utils';

import { RouteService } from '../../../../service/route';
import { PrivilegeService } from '../../../../service/privilege';
import { IssueTagService } from '../../../../service/client/issue-tag';

import * as _ from 'lodash';

declare var jQuery;

@Component({
  selector: 'issue-tag',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./issue-tag.scss'],
  templateUrl: './issue-tag.html',
})
export class IssueTag implements OnInit, AfterViewInit, OnDestroy {
  _issue: any = {};
  set issue(val: any) {
    this._issue = val;
    this.loadData();
  }

  searchModel: any = {};
  searchResult: any[];
  selectedModels: any[] = [];

  constructor(private _routeService: RouteService, private _state: GlobalState, private _route: ActivatedRoute,
              private fb: FormBuilder,
              public activeModal: NgbActiveModal, private issueTagService: IssueTagService) {

  }
  ngOnInit() {

  }
  loadData() {
    this.issueTagService.search(this._issue.id, '', []).subscribe((json: any) => {
      if (json.code == 1) {
        this.selectedModels = json.data;
      }
    });
  }

  ngAfterViewInit() {}

  save() {
    this.issueTagService.save(this._issue.id, this.selectedModels).subscribe((json: any) => {
      if (json.code == 1) {
        this.activeModal.close({ act: 'tag', success: true });
      }
    });
  }

  changeSearch(searchModel: any): void {
    const ids = [];
    this.selectedModels.forEach(item => { ids.push(item.id); });

    this.issueTagService.search(null, searchModel.keywords, ids).subscribe((json: any) => {
      if (json.data.length == 0) {
        this.searchResult = [{ name: searchModel.keywords, type: 'tag' }];
      } else {
        this.searchResult = json.data;
      }
    });
  }

  cancel() {
      this.activeModal.dismiss({ act: 'cancel' });
  }

  ngOnDestroy(): void {

  }

}

