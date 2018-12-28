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
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter();
  @Output() public favoritesEvent: EventEmitter<any> = new EventEmitter();

  @Input() rule: any = {};
  @Input() filter: any = {};
  @Input() issuePropMap: any = {};

  constructor(private _route: ActivatedRoute, private _tqlConditionService: TqlConditionService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  conditionChange(data: any) {
    console.log('conditionChange in tql-condition');
    this.conditionChangeEvent.emit(data);
  }

  uiSelect() {
    return this._tqlConditionService.uiSelect(this.filter.input);
  }
  uiText() {
    return this._tqlConditionService.uiText(this.filter.input);
  }

}
