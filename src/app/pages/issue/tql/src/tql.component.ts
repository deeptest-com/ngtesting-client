import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  @Output() public queryChanged: EventEmitter<any> = new EventEmitter();
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter();
  @Output() public favoritesEvent: EventEmitter<any> = new EventEmitter();

  keywords: string;
  @Input() filters: any[];
  @Input() issuePropMap: any = {};
  checkedConditions: any = {};

  @Input() set rule(model: any) {
    if (!model.rules || model.rules.length == 0) { return; }
    this.checkedConditions = this._tqlService.basicJqlToMap(model);
  }

  constructor(private _route: ActivatedRoute, private _state: GlobalState, private _tqlService: TqlService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  conditionChange(data: any) {
    this.queryChanged.emit(data);
  }
  keywordsChange() {
    this.queryChanged.emit({ code: 'title', input: 'text', type: 'string', keywords: this.keywords });
  }

  search() {
    this.searchEvent.emit();
  }

  addToFavorites() {
    this.favoritesEvent.emit({});
  }

}
