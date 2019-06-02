import {
  Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild,
  OnChanges, DoCheck, SimpleChanges, ElementRef, Inject, Renderer2, Input, Output, EventEmitter
} from '@angular/core';

import { GlobalState } from '../../../../global.state';
import { CONSTANT } from '../../../../utils/constant';
import { Utils } from '../../../../utils/utils';
import { IssueService } from '../../../../service/client/issue';
import {IssueOptService} from "../../../../service/client/issue-opt";
import {PrivilegeService} from "../../../../service/privilege";

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

  @Output() dealWithIssueEvent = new EventEmitter<any>();

  page: any = {};
  issue: any = {};

  priv: any = {};

  constructor(private _state: GlobalState, private privilegeService: PrivilegeService,
              private issueService: IssueService,
              @Inject(ElementRef) public element: ElementRef, @Inject(Renderer2) private renderer: Renderer2) {
    this.priv = this.privilegeService.issuePrivilege();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const tqlElem = jQuery('.tql');
    this.contentHeight = Utils.getContainerHeight(CONSTANT.HEAD_HEIGHT + CONSTANT.FOOTER_HEIGHT
      + CONSTANT.ISSUE_TQL_SPAN + tqlElem.height() + 36);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  viewIssue(item): any {
    if (!this.priv['issue:view']) { return; }

    this.issueService.view(item.id).subscribe((json: any) => {
      this.issue = json.data;
      this.page = json.page;
    });
  }

  getData() {
    this.issueService.getData(this.issue.id).subscribe((json: any) => {
      this.issue.links = json.data.links;
      this.issue.tags = json.data.tags;
      this.issue.histories = json.data.histories;
      this.issue.watchList = json.data.watchList;
    });
  }

  optResult($event) {
    console.log('$event', $event);
    if ($event.act == 'update' || $event.act == 'updateField' || $event.act == 'tran') {
      this.viewIssue(this.issue);
    } else if ($event.act == 'link' || $event.act == 'tag' || $event.act == 'watch') {
      this.getData();
    } else if ($event.act == 'delete') {
      this.issue = {};
    }
  }

  ngOnDestroy(): void {

  }
}

