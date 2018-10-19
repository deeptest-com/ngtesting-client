import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../../utils/constant';

@Component({
  selector: 'table-column-selection',
  templateUrl: './table-column-selection.html',
  styleUrls: ['./styles.scss'],
})
export class TableColumnSelection implements OnInit, AfterViewInit {
  form: FormGroup;

  @Output() selected = new EventEmitter<any>();
  keywords: string = '';

  _columns: any[] = [];
  @Input() set columns(models: any[]) {
    if (models) {
      this._columns = models;
      _.forEach(this._columns, (item: any, index: number) => {
        this.form.addControl('menu-item-' + item.id, new FormControl('', []));
      });
    }
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        'keywords': ['', []],
      }, {});
  }

  ngOnInit(): any {

  }
  ngAfterViewInit() {
  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.display = !item.display;

    this.selected.emit({});
  }

}
