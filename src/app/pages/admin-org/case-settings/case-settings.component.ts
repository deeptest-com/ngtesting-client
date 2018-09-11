import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { GlobalState } from '../../../global.state';
import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

@Component({
  selector: 'case-settings',
  styleUrls: ['./case-settings.scss'],
  templateUrl: './case-settings.html',
})
export class CaseSettings implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'CaseSettings';

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
