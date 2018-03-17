import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CONSTANT } from '../../../../utils/constant';
import { RouteService } from '../../../../service/route';
import { SuiteService } from '../../../../service/suite';

@Component({
  selector: 'nga-suite-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class SuiteListComponent implements OnInit, AfterViewInit {
  orgId: number;
  prjId: number;

  models: any;

  queryForm: FormGroup;
  queryModel: any = { keywords: '', status: '' };
  statusMap: Array<any> = CONSTANT.ExeStatus;

  constructor(private _routeService: RouteService, private fb: FormBuilder, private el: ElementRef,
              private _suiteService: SuiteService) {

    this.queryForm = this.fb.group(
      {
        'status': ['', []],
        'keywords': ['', []],
      }, {},
    );


  }

  ngOnInit() {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.prjId = CONSTANT.CURR_PRJ_ID;

    this.loadData();
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    this._routeService.navTo('/pages/org/' + CONSTANT.CURR_ORG_ID + '/prj/' + CONSTANT.CURR_PRJ_ID
        + '/implement/suite/null/edit');
  }

  delete(projectId: string): void {

  }

  loadData() {
    this._suiteService.query(CONSTANT.CURR_PRJ_ID, this.queryModel).subscribe((json: any) => {
      this.models = json.data;
    });
  }

  queryChange(values: any): void {
      this.loadData();
  }

}

