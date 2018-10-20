import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { CONSTANT } from '../../../../../../utils/constant';

import { TqlConditionSelectionService } from './tql-condition-selection.service';

@Component({
  selector: 'tql-condition-selection',
  templateUrl: './tql-condition-selection.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionSelectionComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  @Output() selected = new EventEmitter<any>();
  keywords: string = '';

  _filters: any[] = [];
  _filtersForSelect: any[] = [];
  @Input() set filters(models: any[]) {
    if (models) {
      this._filters = models;
      this._filtersForSelect = this._filters.filter((it, index) => index > 5);

      _.forEach(this._filters, (item: any, index: number) => {
        this.form.addControl('menu-item-' + item.code, new FormControl('', []));
      });
    }
  }

  constructor(private fb: FormBuilder, private onditionSelectionService: TqlConditionSelectionService) {
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
  }

}
