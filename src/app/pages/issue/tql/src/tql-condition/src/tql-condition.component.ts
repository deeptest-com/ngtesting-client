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
  @Output() selected = new EventEmitter<any>();

  selectOptions: any[] = [];

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): any {
    for (const key in this.model.values) {
      this.selectOptions.push({ key: key, value: this.model.values[key] });
    }

    _.forEach(this.selectOptions, (item: any, index: number) => {
      this.form.addControl('menu-item-' + item.key, new FormControl('', []));
    });
  }
  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(values => this.change(values));
  }

  change(values: any) {
    let selectedItems = '';
    _.forEach(this.selectOptions, (item: any, index: number) => {
      if (item.selected) {
        if (selectedItems != '') {
          selectedItems += ',';
        }

        selectedItems += item.key;
      }
    });

    this.selected.emit({ type: this.model.id, data: selectedItems });
  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.selected = !item.selected;
  }

}
