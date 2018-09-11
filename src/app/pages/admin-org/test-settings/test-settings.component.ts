import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { GlobalState } from '../../../global.state';
import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

@Component({
  selector: 'test-settings',
  styleUrls: ['./test-settings.scss'],
  templateUrl: './test-settings.html',
})
export class TestSettings implements OnInit, AfterViewInit, OnDestroy {
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
