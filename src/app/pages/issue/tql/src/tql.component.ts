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

  projects: any[] = [
    { id: 1, name: 'ngtesting-web' },
    { id: 2, name: 'ngtesting-client' },
    { id: 3, name: 'ngtesting-mindmap' }];

  keywords: string;
  @Input() filters: any[];
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


  selectItem(data: any) {
    this.queryChanged.emit(data);
  }
  selectCondition($event: any) {
    console.log('---selectCondition ', $event);
    // 此处处理
  }

  search($event) {
    this.searchEvent.emit({});
  }

}
