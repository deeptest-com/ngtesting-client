import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';

@Component({
  selector: 'tql',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tql.scss'],
  templateUrl: './tql.html',
})
export class Tql implements OnInit, AfterViewInit {

  @Input() jql: any;
  @Input() filters: any[];

  @Output() public queryChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgbDropdown) private typeDropdown: NgbDropdown;
  @ViewChild(NgbDropdown) private projectDropdown: NgbDropdown;

  projects: any[] = [
    {id: 1, name: 'ngtesting-web'},
    {id: 2, name: 'ngtesting-client'},
    {id: 3, name: 'ngtesting-mindmap'}];

  constructor(private _route: ActivatedRoute, private _state: GlobalState) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  selectItem($event: any) {
    console.log('---selectItem ', $event);
    this.queryChanged.emit($event);
  }
  selectCondition($event: any) {
    console.log('---selectCondition ', $event);
    // 此处处理
  }

  search($event) {
    console.log('===', this.typeDropdown);
    this.typeDropdown.open();
    console.log('===', this.typeDropdown);

    $event.stopPropagation();
  }

}
