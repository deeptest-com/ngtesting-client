import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';

import { NgbDateParserFormatter, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { Utils } from '../../../../../utils/utils';

@Component({
  selector: 'input-design',
  templateUrl: './input-design.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class InputDesignComponent implements OnInit {
  startDate: any;

  @Input() elem: any = {};
  @Input() options: any[] = [];
  _model: any = {};

  public constructor(config: NgbTimepickerConfig, private ngbDateParserFormatter: NgbDateParserFormatter) {
    if (this.elem.input == 'time') {
      config.seconds = true;
      config.spinners = false;
    } else if (this.elem.input == 'date') {
      const now = new Date();
      this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
    }

    if (this.elem.input == 'time') {
      if (!this._model[this.elem.code]) {
        this._model[this.elem.code] = Utils.timeStructFromStr('10:00:00');
      } else {
        this._model[this.elem.code] = Utils.timeStructFromStr(this._model[this.elem.code]);
      }
    } else if (this.elem.input == 'date') {
      this._model[this.elem.code] = this.ngbDateParserFormatter.parse(this._model[this.elem.code]);
    }
  }

  public ngOnInit(): void {
    if (this.options) {
      const defaults: any[] = this.options.filter(
        (option, index) => option.isDefault == true);
      if (defaults.length > 0) {
        this._model[this.elem.code] = defaults[0].id;
      }
    }
  }

}
