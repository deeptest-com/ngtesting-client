import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { GlobalState } from '../../../global.state';
import { RouteService } from '../../../service/route';
import { CONSTANT } from '../../../utils/constant';

@Component({
  selector: 'property',
  styleUrls: ['./property.scss'],
  templateUrl: './property.html',
})
export class Property implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'Property';

  tab: string = 'case-type';
  status: string = 'list';
  @ViewChild('tabset') tabset;

  constructor(private _state: GlobalState,
              private location: Location, private _routeService: RouteService) {
    const path = this.location.path();
    const arr = path.split('property/')[1].split('/');
    this.tab = arr[0];
    this.status = arr[1];
  }

  ngOnInit() {
    this._state.subscribe(CONSTANT.EVENT_PROPERTY_STATUS, this.eventCode, (status) => {
      console.log(CONSTANT.EVENT_PROPERTY_STATUS + ' in ' + this.eventCode, status);

      this.status = status;
    });
  }

  ngAfterViewInit() {
    this.tabset.select(this.tab);
  }

  tabChange(event: any) {
    this.tab = event.nextId;
    this._routeService.navTo('/pages/org-admin/property/' + this.tab + '/list');
  }

  create() {
    this.status = 'edit';
    this._routeService.navTo('/pages/org-admin/property/' + this.tab + '/edit/null');
  }
  back() {
    this.status = 'list';
    this._routeService.navTo('/pages/org-admin/property/' + this.tab + '/list');
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_PROPERTY_STATUS, this.eventCode);
  }

}
