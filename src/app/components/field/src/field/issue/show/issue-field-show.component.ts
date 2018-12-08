import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Deferred} from "../../../../../../utils/utils";
import {CONSTANT} from "../../../../../../utils";

@Component({
  selector: 'issue-field-show',
  templateUrl: './issue-field-show.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueFieldShowComponent implements OnInit {
  @Input() model: any = {};
  @Input() elem: any;
  @Input() issuePropMap: any = {};

  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Output() onSave = new EventEmitter<any>();

  temp: any;
  isEditing: boolean = false;
  labelColNum: number = 4;

  isuPropValMap: any;

  public constructor() {

  }

  public ngOnInit(): void {
    this.isuPropValMap = CONSTANT.ISU_PROPERTY_VAL_MAP;

    console.log('ngOnInit', this.isuPropValMap);
  }

  edit () {
    this.isEditing = true;
    this.temp = this.model[this.elem.colCode];
  }

  save() {
    const deferred = new Deferred();
    deferred.promise.then((data) => {
      this.cancel();
    }).catch((err) => { console.log('err', err); });

    console.log('toSave', this.model[this.elem.colCode], this.temp);
    if (this.model[this.elem.colCode] != this.temp) {
      this.onSave.emit({ deferred: deferred,
        data: { code: this.elem.colCode, value: this.model[this.elem.colCode] }});
    } else {
      this.cancel();
    }
  }

  cancel() {
    this.isEditing = false;
  }

  public getCol(): number {
    if (this.elem.fullLine) {
      this.labelColNum = 2;
    } else {
      this.labelColNum = 4;
    }

    return this.labelColNum;
  }
}
