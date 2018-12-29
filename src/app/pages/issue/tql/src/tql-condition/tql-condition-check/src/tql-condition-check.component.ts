import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TqlConditionService } from '../../tql-condition.service';
import { TqlConditionCheckService } from './tql-condition-check.service';

@Component({
  selector: 'tql-condition-check',
  templateUrl: './tql-condition-check.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionCheckComponent implements OnInit, AfterViewInit {
  @Input() rule: any = {};
  @Input() filter: any = {};
  @Input() issuePropMap: any = {};

  @Output() conditionChangeEvent = new EventEmitter<any>();

  checkedItemsFromRule: any = {};

  keywords: string = '';
  selectOptions: any[] = [];
  hasChecked: boolean = false;

  constructor(private fb: FormBuilder,
              private tqlConditionCheckService: TqlConditionCheckService) {

  }

  ngOnInit(): any {
    this.selectOptions = this.issuePropMap[this.filter.code];

    this.checkedItemsFromRule = this.tqlConditionCheckService.getSelectedItemsFromRule(this.rule, this.filter.code);
    this.setOptionChecked();
  }

  ngAfterViewInit() {

  }

  selectItem(item): any {
    item.checked = !item.checked;

    const newRule = this.tqlConditionCheckService.newBasicRule(this.filter, this.selectOptions);
    this.conditionChangeEvent.emit(newRule);

    this.computerIfFilterIsWork();
  }

  setOptionChecked() {
    _.forEach(this.selectOptions, (option: any) => {
      option.checked = this.checkedItemsFromRule ? this.checkedItemsFromRule[option.id] : false;
    });
    this.computerIfFilterIsWork();
  }

  computerIfFilterIsWork() {
      for (let i = 0; i < this.selectOptions.length; i++) {
        if (this.selectOptions[i].checked) {
          this.hasChecked = true;
          return;
        }
      }
      this.hasChecked = false;
  }

  // getVal(elem, option) {
  //   console.log('000000', elem, option);
  //
  //   if (elem.buildIn) {
  //     return option.id;
  //   } else {
  //     return option.value;
  //   }
  // }

}
