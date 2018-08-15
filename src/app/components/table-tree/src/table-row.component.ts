import { Input, Output, EventEmitter, Component, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';

import {GlobalState} from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';

@Component({
  selector: '[table-row]',
  templateUrl: './table-row.html'
})
export class TableRowComponent implements OnInit, OnDestroy {
  eventCode: string = 'TableRowComponent';

  orgId: number;
  @Input()
  public model: any;
  @Input()
  public maxLevel: number;
  @Input()
  public keywords: string;

  orgPrivileges: any;

  counter = Array;

  constructor(private _state: GlobalState, private el: ElementRef) {
    this.orgId = CONSTANT.CURR_ORG_ID;
    this.orgPrivileges = CONSTANT.ORG_PRIVILEGES;

    // this._state.subscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode, (json) => {
    //   console.log(WS_CONSTANT.WS_ORG_SETTINGS + ' in ' + this.eventCode, json);
    //
    //   this.orgPrivileges = json.orgPrivileges;
    // });

  }

  public ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._state.unsubscribe(WS_CONSTANT.WS_ORG_SETTINGS, this.eventCode);
  }

}
