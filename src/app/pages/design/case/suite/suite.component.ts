import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';
import { SlimLoadingBarService } from '../../../../components/ng2-loading-bar';
import { CaseService } from '../../../../service/client/case';

declare var jQuery;

@Component({
  selector: 'case-suite',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./suite.scss',
    '../../../../../assets/vendor/ztree/css/zTreeStyle/zTreeStyle.css',
    '../../../../components/ztree/src/styles.scss'],
  templateUrl: './suite.html',
})
export class CaseSuite implements OnInit, AfterViewInit, OnDestroy {
  orgId: number;
  prjId: number;
  caseId: number;

  public treeModel: any;
  public treeSettings: any = { usage: 'edit', isExpanded: true, sonSign: false };

  routeSub: any;

  constructor(private _routeService: RouteService, private _route: ActivatedRoute, private _state: GlobalState,
              private _caseService: CaseService, private slimLoadingBarService: SlimLoadingBarService) {

  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.caseId = params['caseId'];
    });
    if (this.caseId) {
      this.treeSettings.jumpTo = this.caseId;
    }

    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;
    this.loadData();

    this.routeSub = this._route.pathFromRoot[5].params.subscribe(params => {
      if (this.prjId != +params['prjId']) {
        this.prjId = +params['prjId'];
        this.loadData();
      }
    });
  }

  ngAfterViewInit() {

  }

  loadData() {
    this.startLoading();

    this._caseService.query().subscribe((json: any) => {
      this.treeModel = json.data;

      CONSTANT.CASE_TYPES_FOR_PROJECT = json.caseTypeList;
      CONSTANT.CASE_PRIORITIES_FOR_PROJECT = json.casePriorityList;
      CONSTANT.CUSTOM_FIELD_FOR_PROJECT = json.customFields;

      this.completeLoading();
    });
  }
  startLoading() {
    this.slimLoadingBarService.start(() => { console.log('Loading complete'); });
  }
  completeLoading() {
    setTimeout(() => { this.slimLoadingBarService.complete(); }, 500);
  }

  rename(event: any) {
    const testCase = event.data;
    this._caseService.rename(testCase).subscribe((json: any) => {
      event.deferred.resolve(json.data);
    });
  }
  delete(event: any) {
    const testCase = event.data;
    this._caseService.delete(testCase.id).subscribe((json: any) => {
      event.deferred.resolve(json.data);
    });
  }
  move(event: any) {
    this._caseService.move(event.data).subscribe((json: any) => {
      event.deferred.resolve(json.data);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}

