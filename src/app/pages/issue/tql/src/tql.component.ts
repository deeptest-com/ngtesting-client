import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';

@Component({
  selector: 'tql',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tql.scss'],
  templateUrl: './tql.html',
})
export class Tql implements OnInit, AfterViewInit {
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  form: FormGroup;
  @Input() query: any;
  @Input() tql: string = 'all';
  @Output() public queryChanged: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private _state: GlobalState) {
    this.form = this.fb.group(
      {
        'disabled': ['', []],
        'keywords': ['', []],
      }, {},
    );
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.form.valueChanges.debounceTime(CONSTANT.DebounceTime).subscribe(
      values => this.queryChanged.emit());
  }
}
