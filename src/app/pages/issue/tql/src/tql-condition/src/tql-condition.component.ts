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

  @Output() selected = new EventEmitter<any>();

  selectOptions: any[] = [];

  constructor(private fb: FormBuilder, private tqlConditionService: TqlConditionService) {
    this.form = this.fb.group({});
  }

  ngOnInit(): any {

    for (const key in this.model.values) {
      this.selectOptions.push({ key: key, value: this.model.values[key],
        checked: this.checkedItems ? this.checkedItems[key] : false });
    }

    _.forEach(this.selectOptions, (item: any, index: number) => {
      this.form.addControl('menu-item-' + item.key, new FormControl('', []));
    });
  }
  ngAfterViewInit() {

  }

  clickMenu($event): any {
    $event.stopPropagation();
  }
  selectItem(item): any {
    item.checked = !item.checked;

    this.selected.emit({ id: this.model.id, options: this.selectOptions });
  }

}
