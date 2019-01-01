import * as _ from 'lodash';

import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TqlConditionTextService } from './tql-condition-text.service';
import {CONSTANT} from "../../../../../../../utils";

@Component({
  selector: 'tql-condition-text',
  templateUrl: './tql-condition-text.html',
  styleUrls: ['./styles.scss'],
})
export class TqlConditionTextComponent implements OnInit, AfterViewInit {
  @Input() rule: any = {};
  @Input() filter: any = {};

  @Output() conditionChangeEvent = new EventEmitter<any>();

  keywords: string = '';
  hasChecked: boolean = false;

  constructor(private fb: FormBuilder, private tqlConditionTextService: TqlConditionTextService) {

  }

  ngOnInit(): any {

  }

  ngAfterViewInit() {

  }

  keywordsChange() {
    const newRule = this.tqlConditionTextService.newBasicRule(this.filter, this.keywords);
    this.conditionChangeEvent.emit(newRule);

    this.computerIfFilterIsWork();
  }

  computerIfFilterIsWork() {
    this.hasChecked = !!this.keywords;
  }

}
