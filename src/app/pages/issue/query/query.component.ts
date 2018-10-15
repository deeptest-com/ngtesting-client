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
  jql: any = {};
  checkedConditions: any = {};
  filters: any[];
  init = 0;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,
              private _tqlService: TqlService, private _issueService: IssueService) {

    this._activeRoute.params.subscribe(params => {
      this.jql = params['jql'];

      if (this.jql == 'all') {
        this.jql = {};
        this.loadData();
      } else {
        this.jql = JSON.parse(this.jql);
        this.loadData(this.init++ == 0);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  queryChanged(data): void {
    this.jql = this._tqlService.buildJql(this.jql, this.filters, data);
    console.log('---queryChange ', this.jql);

    let url = '/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
      + '/issue/query/' + JSON.stringify(this.jql);
    this._router.navigateByUrl(url);
  }

  loadData(init: boolean = true) {
    this._tqlService.query(this.jql, init).subscribe((json: any) => {
      console.log('===', json);
      this.models = json.data;

      if (init) {
        this.jql = json.jql;
        this.filters = json.filters;
      }
    });
  }

  ngOnDestroy(): void {

  }

}
