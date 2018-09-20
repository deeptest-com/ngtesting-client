import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { TqlService } from './tql.service';

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
  @Input() tql: string;
  @Output() public queryChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgbDropdown) private typeDropdown: NgbDropdown;

  constructor(private fb: FormBuilder, private _state: GlobalState, _tqlService: TqlService) {
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

  selectProject() {

  }

  search() {
    console.log('===', this.typeDropdown);
    this.typeDropdown.open();
    console.log('===', this.typeDropdown);
  }
}
