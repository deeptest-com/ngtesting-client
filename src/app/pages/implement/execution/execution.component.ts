import {Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {GlobalState} from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';
import { Utils } from '../../../utils/utils';
import {ValidatorUtils} from '../../../validator/validator.utils';
import { RouteService } from '../../../service/route';

declare var jQuery;

@Component({
  selector: 'execution',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./execution.scss'],
  templateUrl: './execution.html'
})
export class Execution implements OnInit, AfterViewInit, OnDestroy {
  eventCode:string = 'Execution';

  contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT);
  leftWidth: number;
  act: string;

  constructor(private _state: GlobalState, private _route: ActivatedRoute) {
    this._route.params.subscribe(params => {
      this.act = params['act'];
    });
  }

  ngOnInit() {
    this.leftWidth = CONSTANT.PROFILE.leftSizeExe;
  }
  ngAfterViewInit() {}

  ngOnDestroy(): void {
  }

}

