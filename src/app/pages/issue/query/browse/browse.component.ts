import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild,
  OnChanges, DoCheck, SimpleChanges, ElementRef, Inject, Renderer2 } from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { IssueService } from '../../../../service/client/issue';

declare var jQuery;

@Component({
  selector: 'issue-browse',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./browse.scss'],
  templateUrl: './browse.html',
})
export class IssueBrowse implements OnInit, AfterViewInit, OnDestroy, OnChanges, DoCheck {
  eventCode: string = 'IssueView';

  contentHeight: number;
  leftWidth: number = CONSTANT.PROFILE.leftSizeIssue;

  issue: any[] = [];

  constructor(private _state: GlobalState, private _issueService: IssueService,
              @Inject(ElementRef) public element: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
    const tqlElem = jQuery('.tql');
    this.contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT
      + CONSTANT.ISSUE_TQL_SPAN + tqlElem.height());
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  loadData() {

  }

  ngOnDestroy(): void {

  }
}

