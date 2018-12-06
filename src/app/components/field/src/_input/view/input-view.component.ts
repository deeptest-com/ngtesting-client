import { Input, Component, OnInit, OnChanges } from '@angular/core';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Utils } from '../../../../../utils/utils';

@Component({
  selector: 'input-view',
  templateUrl: './input-view.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class InputViewComponent implements OnInit, OnChanges {
  @Input() elem: any = {};
  _model: any = {};

  get model(): any {
    return this._model;
  }
  @Input('model')
  set model(value: any) {
    this._model = value;

    // if (this.elem.input == 'time') {
    //   if (!this._model[this.elem.code]) {
    //     this._model[this.elem.code] = Utils.timeStructFromStr('10:00:00');
    //   } else {
    //     this._model[this.elem.code] = Utils.timeStructFromStr(this._model[this.elem.code]);
    //   }
    // } else if (this.elem.input == 'date') {
    //   this._model[this.elem.code] = this.ngbDateParserFormatter.parse(this._model[this.elem.code]);
    // }
  }

  public constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {

  }

  public ngOnInit(): void {

  }

  public ngOnChanges(): void {

  }

}
