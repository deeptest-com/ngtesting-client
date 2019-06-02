import {Component, Directive, ElementRef, Inject, Renderer2, OnDestroy, OnInit, AfterViewInit} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';

import { WS_CONSTANT } from '../../../utils/ws-constant';
import { GlobalState } from '../../../global.state';

import { PrivilegeService } from '../../../service/privilege';

@Component({
  selector: 'case',
  styleUrls: ['./case.scss'],
  templateUrl: './case.html'
})
export class Case implements OnInit, AfterViewInit, OnDestroy {
  eventCode:string = 'Case';

  projectId: number;
  key: number;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);
  leftWidth: number = CONSTANT.PROFILE.leftSizeDesign;
  canEdit: boolean;

  constructor(private _state: GlobalState, private _route: ActivatedRoute, private privilegeService: PrivilegeService) {
    // this._state.subscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode, (json) => {
    //   console.log(WS_CONSTANT.WS_PRJ_SETTINGS + ' in ' + this.eventCode, json);
    //
    //   this.canEdit = this.privilegeService.hasPrivilege('test_case:maintain', json.prjPrivileges);
    // });

    console.log('contentHeight', this.contentHeight);
  }

  ngOnInit() {
      this.canEdit = this.privilegeService.hasPrivilege('test_case:maintain');
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    // this._state.unsubscribe(WS_CONSTANT.WS_PRJ_SETTINGS, this.eventCode);
  }

}
