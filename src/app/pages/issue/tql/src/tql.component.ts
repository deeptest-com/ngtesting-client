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

  @Output() public conditionChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() public searchEvent: EventEmitter<any> = new EventEmitter();
  @Output() public favoritesEvent: EventEmitter<any> = new EventEmitter();

  @Input() rule: any = {};
  @Input() filters: any[];

  titleKeywords: string;

  constructor(private _route: ActivatedRoute, private _state: GlobalState, private _tqlService: TqlService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  conditionChange(data: any) {
    console.log('conditionChange in tql');
    this.conditionChangeEvent.emit(data);
  }
  titleChange() {
    this.conditionChangeEvent.emit({ code: 'title', input: 'text', type: 'string', keywords: this.titleKeywords });
  }

  search() {
    this.searchEvent.emit();
  }

  addToFavorites() {
    this.favoritesEvent.emit({});
  }

}
