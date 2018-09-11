import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalState } from '../../../../../global.state';

import { CONSTANT } from '../../../../../utils/constant';
import { Utils } from '../../../../../utils/utils';
import { RouteService } from '../../../../../service/route';
import { GroupService } from '../../../../../service/group';

@Component({
  selector: 'group-list',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.scss'],
  templateUrl: './list.html',
})
export class GroupList implements OnInit, AfterViewInit {

  queryForm: FormGroup;
  queryModel: any = { keywords: '', disabled: 'false' };
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  models: any;
  collectionSize: number = 0;
  page: number = 1;
  pageSize: number = 15;

  constructor(private _routeService: RouteService, private _state: GlobalState,
              private fb: FormBuilder, private el: ElementRef, private groupService: GroupService) {
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
  }

  ngAfterViewInit() {
    this.queryForm.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.queryChange(values));
  }

  create(): void {
    const that = this;

    that._routeService.navTo('/pages/org-admin/group/edit/null');
  }

  queryChange(values: any): void {
    this.loadData();
  }
  pageChange(event: any): void {
    this.loadData();
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
    this.groupService.list(this.queryModel, this.page, this.pageSize).subscribe((json: any) => {
      this.collectionSize = json.total;
      this.models = json.data;
    });
  }

}
