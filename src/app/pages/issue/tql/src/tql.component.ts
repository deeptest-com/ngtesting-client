import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy,
  Input, Output, EventEmitter, ViewChild } from '@angular/core';

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
  statusMap: Array<any> = CONSTANT.EntityDisabled;

  @Input() query: any;
  @Input() tql: string;
  @Output() public queryChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgbDropdown) private typeDropdown2: NgbDropdown;
  @ViewChild(NgbDropdown) private projectDropdown2: NgbDropdown;

  projects: any[] = [
    { id: 1, name: 'ngtesting-web' },
    { id: 2, name: 'ngtesting-client' },
    { id: 3, name: 'ngtesting-mindmap' } ];

  constructor(private _state: GlobalState, _tqlService: TqlService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  selectProject() {

  }

  selected($event: any) {
    console.log('---selected ', $event);
  }
  search($event) {
    console.log('===', this.typeDropdown2);
    this.typeDropdown2.open();
    console.log('===', this.typeDropdown2);

    $event.stopPropagation();
  }
}
