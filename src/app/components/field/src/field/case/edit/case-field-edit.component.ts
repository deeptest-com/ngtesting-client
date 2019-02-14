import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {CONSTANT} from "../../../../../../utils";

@Component({
  selector: 'case-field-edit',
  templateUrl: './case-field-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class CaseFieldEditComponent implements OnInit {
  @Input() model: any = {};
  @Input() elem: any = {};
  casePropMap: any = {};

  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  labelColNum: number = 3;
  inputColNum: number = 9;

  public constructor() {
    this.casePropMap = CONSTANT.CASE_PROPERTY_MAP;
  }

  public ngOnInit(): void {

  }
}
