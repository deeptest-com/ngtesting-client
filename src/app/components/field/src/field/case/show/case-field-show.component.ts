import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Deferred } from '../../../../../../utils/utils';
import { CONSTANT } from '../../../../../../utils';

@Component({
  selector: 'case-field-show',
  templateUrl: './case-field-show.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class CaseFieldShowComponent implements OnInit {
  @Input() model: any = {};
  @Input() elem: any = {};

  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  @Output() onSave = new EventEmitter<any>();

  temp: any;
  isEditing: boolean = false;
  labelColNum: number = 4;

  casePropMap: any = {};
  casePropValMap: any = {};

  @Input() elemCode;

  public constructor() {
    this.casePropMap = CONSTANT.CASE_PROPERTY_MAP;
    this.casePropValMap = CONSTANT.CASE_PROPERTY_VAL_MAP;
  }

  public ngOnInit(): void {
    this.elem = { colCode: this.elemCode, fullLine: true, buildIn: true };
    if (['typeId', 'priorityId', 'statusId'].indexOf(this.elemCode) > -1) {
      this.elem.input = 'dropdown';
    } else if ('content' == this.elemCode) {
      this.elem.input = 'richtext';
    }
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
}
