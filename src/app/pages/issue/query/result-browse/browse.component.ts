import {
  Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild,
  OnChanges, DoCheck, SimpleChanges, ElementRef, Inject, Renderer2, Input, Output, EventEmitter
} from '@angular/core';

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
export class IssueBrowse implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  eventCode: string = 'IssueView';

  contentHeight: number;
  leftWidth: number = CONSTANT.PROFILE.leftSizeIssue;

  @Input() issues: any[] = [];
  @Input() orderBy: any = {};
  @Output() dealWithIssueEvent = new EventEmitter<any>();

  issue: any;
  page: any;

  constructor(private _state: GlobalState, private issueService: IssueService,
              @Inject(ElementRef) public element: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const tqlElem = jQuery('.tql');
    this.contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT
      + CONSTANT.ISSUE_TQL_SPAN + tqlElem.height());
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  viewIssue(item): any {
    this.issueService.view(item.id).subscribe((json: any) => {
      this.issue = json.data;
    });
  }

  ngOnDestroy(): void {

  }
}

