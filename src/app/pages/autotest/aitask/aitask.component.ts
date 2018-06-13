import {Component, Directive, ElementRef, Inject, Renderer2, OnDestroy, OnInit, AfterViewInit} from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';

import {GlobalState} from "../../../global.state";

import { PrivilegeService } from '../../../service/privilege';

@Component({
  selector: 'aitask',
  styleUrls: ['./aitask.scss'],
  templateUrl: './aitask.html',
})
export class Aitask implements OnInit, AfterViewInit, OnDestroy {
  eventCode:string = 'AiTask';

  projectId: number;
  key: number;

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);
  leftWidth: number;
  canEdit: boolean;

  constructor(private _state: GlobalState, private _route: ActivatedRoute, private privilegeService:PrivilegeService) {

  }

  ngOnInit() {
      this.leftWidth = CONSTANT.PROFILE.leftSizeCase;;
      this.canEdit = this.privilegeService.hasPrivilege('aitask-update');
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
  };

}
