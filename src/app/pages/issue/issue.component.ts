import { Component, Directive, ElementRef, Inject, Renderer2, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CONSTANT } from '../../utils/constant';
import { Utils } from '../../utils/utils';

import { GlobalState } from '../../global.state';

import { PrivilegeService } from '../../service/privilege';

@Component({
  selector: 'issue',
  styleUrls: ['./issue.scss'],
  templateUrl: './issue.html',
})
export class Issue implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'Issue';

  constructor(private _state: GlobalState, private _route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
  };

}
