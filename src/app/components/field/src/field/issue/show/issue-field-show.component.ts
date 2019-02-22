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

  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Output() onSave = new EventEmitter<any>();

  temp: any;
  isEditing: boolean = false;
  labelColNum: number = 4;

  issuePropMap: any = {};
  issuePropValMap: any;

  public constructor() {
    this.issuePropMap = CONSTANT.ISU_PROPERTY_MAP;
    this.issuePropValMap = CONSTANT.ISU_PROPERTY_VAL_MAP;
  }

  public ngOnInit(): void {

    if (this.elem.colCode == 'statusId') {
      this.elem.readonly = true;
    }

    this.labelColNum = this.getCol();
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

      let newVal = this.model[this.elem.colCode];
    console.log('toSave', newVal, this.temp);

    if (newVal != this.temp) {
      this.onSave.emit({ deferred: deferred,
        data: { code: this.elem.colCode, name: this.elem.label, value: newVal, label: this.elem.label,
          type: this.elem.type, buildIn: this.elem.buildIn }});
    } else {
      this.cancel();
    }
  }

  cancel() {
    this.isEditing = false;
  }

  public getCol(): number {
    let num;

    if (this.elem.fullLine) {
      num = 2;
    } else {
      num = 4;
    }

    return num;
  }
}
