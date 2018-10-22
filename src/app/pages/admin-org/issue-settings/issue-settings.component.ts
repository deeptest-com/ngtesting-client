import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { GlobalState } from '../../../global.state';
import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

@Component({
  selector: 'issue-settings',
  styleUrls: ['./issue-settings.scss'],
  templateUrl: './issue-settings.html',
})
export class IssueSettings implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueSettings';

  constructor(private _state: GlobalState,
              private location: Location, private _routeService: RouteService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {

  }

}
