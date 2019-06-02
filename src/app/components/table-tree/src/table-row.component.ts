import { Input, Output, EventEmitter, Component, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalState} from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { WS_CONSTANT } from '../../../utils/ws-constant';
import {RouteService} from "../../../service/route";

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

  // orgPrivileges: any;

  constructor(private _state: GlobalState, private el: ElementRef,
              private _routeService: RouteService) {
    this.orgId = CONSTANT.CURR_ORG_ID;
  }

  public ngOnInit(): void {

  }

  config(item) {
    CONSTANT.WORK_PRJ_NAME = item.name;

    this._routeService.navTo('/pages/org/' + this.orgId + '/prjs/' + item.id + '/config');
  }

  canEditProject(project: any) {
    return CONSTANT.ORG_PRIVILEGES['org_org:*'] || CONSTANT.ORG_PRIVILEGES['org_project:*'];
  }
  canDesign(project: any) {
    return project.privs != null && (project.privs['test_case:view'] || project.privs['test_case:maintain']);
  }
  canExe(project: any) {
    return project.privs != null && (project.privs['test_task:view'] || project.privs['test_task:exe']);
  }

  ngOnDestroy(): void {

  }

}
