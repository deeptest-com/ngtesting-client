import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { WS_CONSTANT } from '../../../../../utils/ws-constant';
import { RouteService } from '../../../../../service/route';
import { OrgService } from '../../../../../service/org';
import { AccountService } from '../../../../../service/account';

@Component({
  selector: 'org-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class OrgList implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'OrgList';

  queryForm: FormGroup;
  queryModel: any = { keywords: '', disabled: 'false' };
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  models: any = [];

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef,
              private orgService: OrgService, private accountService: AccountService) {
  }

  ngOnInit() {
    const that = this;

    that.queryForm = that.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );

    that.loadData();
    this._state.subscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode, (json) => {
      console.log(WS_CONSTANT.WS_ORG_SETTINGS + ' in ' + this.eventCode, json);

      this.loadData();
    });
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    this._routeService.navTo('/pages/org-admin/org-settings/org/edit/null');
  }

  queryChange(values: any): void {
    const that = this;
    that.loadData();
  }

  edit($event: any): void {
    const that = this;

    console.log($event);
  }
  delete($event: any): void {
    const that = this;

    console.log($event);
  }

  loadData() {
    const that = this;

    that.orgService.list(that.queryModel).subscribe((json: any) => {
      that.models = json.data;
    });
  }

  setDefault(item: any): void {
    this.orgService.setDefault(item.id, this.queryModel).subscribe((json: any) => {
      this.models = json.data;
    });
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode);
  }

}
