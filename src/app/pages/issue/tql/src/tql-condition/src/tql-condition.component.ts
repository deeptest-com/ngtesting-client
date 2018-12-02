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
    if (!this.init) {
      this.computerSelected();
    } else {
      this.init = false;
    }
  }
  get checkedItems() {
    return this._checkedItems;
  }

  @Input() issuePropMap: any = {};

  @Output() selected = new EventEmitter<any>();

  keywords: string = '';
  selectOptions: any[] = [];
  hasChecked: boolean = false;
  init: boolean = true;

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {

  }

  ngOnInit(): any {
    this.selectOptions = this.issuePropMap[this.model.code];
    this.computerSelected();
  }
  ngAfterViewInit() {

  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.checked = !item.checked;

    this.selected.emit({ code: this.model.code, options: this.selectOptions });
    this._hasChecked();
  }

  _hasChecked() {
    for(let i = 0; i < this.selectOptions.length; i++) {
      if (this.selectOptions[i].checked) {
        this.hasChecked = true;
        return;
      }
    }
    this.hasChecked = false;
  }

  computerSelected() {
    _.forEach(this.selectOptions, (item: any, index: number) => {
      item.checked = this.checkedItems ? this.checkedItems[item.id] : false;
    });
    this._hasChecked();
    console.log('!!!!!!!!', this.selectOptions, this.checkedItems);
  }

}
