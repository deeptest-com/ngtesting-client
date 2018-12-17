import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../../../utils/constant';

import { TqlConditionService } from './tql-condition.service';

@Component({
  selector: 'tql-condition',
  templateUrl: './tql-condition.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionComponent implements OnInit, AfterViewInit {
  @Input() search: boolean = true;
  @Input() model: any;
  @Input() _checkedItems: any = {};

  @Input() set checkedItems(models: any) {
    this._checkedItems = models;
    if (this.init) { // 第一次忽略，在ngOnInit中初始化
      this.init = false;
    } else {
      this.computerSelected();
    }
  }
  get checkedItems() {
    return this._checkedItems;
  }

  @Input() issuePropMap: any = {};

  @Output() conditionChangeEvent = new EventEmitter<any>();

  keywords: string = '';
  selectOptions: any[] = [];
  hasChecked: boolean = false;
  init: boolean = true;

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {

  }

  ngOnInit(): any {
    console.log('this.model', this.model);
    if (this.model.input === 'dropdown') {
      this.selectOptions = this.issuePropMap[this.model.code];
    } else {
      this.keywords = this._checkedItems['keywords'];
    }
    this.computerSelected();
  }

  ngAfterViewInit() {

  }

  keywordsChange() {
    if (this.model.input != 'dropdown') { // 修改查询条件，而不是过滤选项
      this.conditionChangeEvent.emit({ code: this.model.code, keywords: this.keywords });
      this._apply();
    }
  }

  selectItem(item): any {
    item.checked = !item.checked;

    this.conditionChangeEvent.emit({ code: this.model.code, options: this.selectOptions });
    this._apply();
  }

  _apply() {
    if (this.model.input === 'dropdown') {
      for (let i = 0; i < this.selectOptions.length; i++) {
        if (this.selectOptions[i].checked) {
          this.hasChecked = true;
          return;
        }
      }
      this.hasChecked = false;
    } else {
      this.hasChecked = this.keywords != null && this.keywords != '';
    }

    console.log('this.model.input', this.model.input);
  }

  computerSelected() {
    if (this.model.input === 'dropdown') {
      _.forEach(this.selectOptions, (item: any, index: number) => {
        item.checked = this.checkedItems ? this.checkedItems[item.id] : false;
      });
    }
    this._apply();
  }

}
