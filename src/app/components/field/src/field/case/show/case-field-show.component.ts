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
    // 对于用例的內置属性，直接传elemCode过来
    if (this.elemCode != null) {
      this.elem.colCode = this.elemCode;
      this.elem.buildIn = true;

      if (['typeId', 'priorityId', 'statusId'].indexOf(this.elemCode) > -1) {
        this.elem.type = 'integer';
        this.elem.input = 'dropdown';
      } else if (['content'].indexOf(this.elemCode) > -1) {
        this.elem.type = 'string';
        this.elem.input = 'richtext';
      } else if (['estimate', 'objective'].indexOf(this.elemCode) > -1) {
        this.elem.type = 'string';
        this.elem.input = 'text';
      }
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
        data: { code: this.elem.colCode, value: this.model[this.elem.colCode],
          type: this.elem.type, buildIn: this.elem.buildIn }});
    } else {
      this.cancel();
    }
  }

  cancel() {
    this.isEditing = false;
  }
}
