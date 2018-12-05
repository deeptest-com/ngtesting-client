import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'common-settings',
  styleUrls: ['./common-settings.scss'],
  templateUrl: './common-settings.html',
})
export class CommonSettings implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueSettings';

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {

  }

}
