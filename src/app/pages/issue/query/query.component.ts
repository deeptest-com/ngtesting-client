import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';
import { Utils } from '../../../utils/utils';
import { RouteService } from '../../../service/route';
import { IssueService } from '../../../service/client/issue';

import { TqlService } from '../tql/src/tql.service';

@Component({
  selector: 'issue-query',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./query.scss'],
  templateUrl: './query.html',
})
export class IssueQuery implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueQuery';

  orgId: number;
  prjId: number;

  models: any[];
  jql: any;
  filters: any[];

  constructor(private _route: ActivatedRoute,
              private _tqlService: TqlService, private _issueService: IssueService) {
    this._route.params.forEach((params: Params) => {
      this.jql = params['jql'];
    });

    this.loadData();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  queryChanged($event): void {
    console.log('---queryChange ', $event);
  }

  loadData() {
    this._tqlService.query().subscribe((json: any) => {
      console.log('===', json);
      this.jql = json.tql;
      this.filters = json.filters;
      this.models = json.data;
    });
  }

  ngOnDestroy(): void {

  }

}
