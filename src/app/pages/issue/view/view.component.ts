import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../global.state';

import { CONSTANT } from '../../../utils/constant';

import { IssueService } from '../../../service/issue';

declare var jQuery;

@Component({
  selector: 'issue-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class IssueView implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'IssueView';

  projectId: number;
  id: number;
  model: any = {};
  isModule: true;

  settings: any;
  data: any;
  form: any;
  tab: string = 'content';

  issuePropertyMap: any;
  fields: any[] = [];
  user: any;

  constructor(private _state: GlobalState, private _issueService: IssueService) {
    this.issuePropertyMap = CONSTANT.CASE_PROPERTY_MAP;
  }
  ngOnInit() {
    this.projectId = CONSTANT.CURR_PRJ_ID;
    this.user = CONSTANT.PROFILE;

    this._state.subscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode, (data: any) => {
      const issue = data.node;

      if (!issue || issue.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      this.fields = CONSTANT.CUSTOM_FIELD_FOR_PROJECT;

      if (issue) {
        this.id = issue.id;
        this.loadData();
      } else {
        this.model = null;
      }
    });

    this.settings = {
      canEdit: false,
      columns: {
        ordr: {
          title: '顺序',
        },
        opt: {
          title: '操作',
          editor: {
            type: 'textarea',
          },
        },
        expect: {
          title: '期望结果',
          editor: {
            type: 'textarea',
          },
        },
      },
    };
  }
  ngAfterViewInit() {}

  loadData() {
    this._issueService.get(this.id).subscribe((json: any) => {
      this.model = json.data;
    });
  }

  tabChange(event: any) {
    this.tab = event.nextId;
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode);
  }
}

