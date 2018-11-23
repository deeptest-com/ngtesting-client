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
  form: FormGroup;

  @Input() search: boolean = true;
  @Input() model: any;
  @Input() checkedItems: any = {};
  @Input() issuePropMap: any = {};

  @Output() selected = new EventEmitter<any>();

  keywords: string = '';
  selectOptions: any[] = [];

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): any {
    this.selectOptions = this.issuePropMap[this.model.code];

    _.forEach(this.selectOptions, (item: any, index: number) => {
        item.checked = this.checkedItems ? this.checkedItems[item.id] : false;
    });
    console.log('!!!!!!!!', this.selectOptions, this.checkedItems);

    this.form.addControl('keywords', new FormControl('', []));
    _.forEach(this.selectOptions, (item: any, index: number) => {
        this.form.addControl('menu-item-' + item.code, new FormControl('', []));
    });
  }
  ngAfterViewInit() {

  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.checked = !item.checked;

    this.selected.emit({ code: this.model.code, options: this.selectOptions });
  }

}
