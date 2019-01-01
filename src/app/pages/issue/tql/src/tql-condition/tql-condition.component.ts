import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TqlConditionService } from './tql-condition.service';

@Component({
  selector: 'tql-condition',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./styles.scss'],
  templateUrl: './tql-condition.html',
})
export class TqlConditionComponent implements OnInit, AfterViewInit {

  @Output() public conditionChangeEvent: EventEmitter<any> = new EventEmitter();

  @Input() rule: any = {};
  @Input() filter: any = {};

  ui: string;

  constructor(private _route: ActivatedRoute, private _tqlConditionService: TqlConditionService) {

  }

  ngOnInit(): void {
    this.ui = this._tqlConditionService.ui(this.filter.input);
  }

  ngAfterViewInit(): void {

  }

  conditionChange(data: any) {
    console.log('conditionChange in tql-condition');
    this.conditionChangeEvent.emit(data);
  }

}
