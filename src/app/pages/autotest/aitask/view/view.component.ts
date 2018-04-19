import { Component, ViewEncapsulation, NgModule, Pipe, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { GlobalState } from '../../../../global.state';

import { CONSTANT } from '../../../../utils/constant';

import { AitaskService } from '../../../../service/aitask';

declare var jQuery;

@Component({
  selector: 'aitask-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view.scss'],
  templateUrl: './view.html',
})
export class AitaskView implements OnInit, AfterViewInit, OnDestroy {
  eventCode: string = 'AitaskView';

  projectId: number;
  id: number;
  model: any = {};
  isModule: true;

  settings: any;
  data: any;
  form: any;
  tab: string = 'content';

  aitaskPropertyMap: any;
  fields: any[] = [];
  user: any;

  constructor(private _state: GlobalState, private _aitaskService: AitaskService) {
    this.aitaskPropertyMap = CONSTANT.CASE_PROPERTY_MAP;
  }
  ngOnInit() {
    this.projectId = CONSTANT.CURR_PRJ_ID;
    this.user = CONSTANT.PROFILE;

    this._state.subscribe(CONSTANT.EVENT_CASE_EDIT, this.eventCode, (data: any) => {
      const aitask = data.node;

      if (!aitask || aitask.isParent) {
        this.model = { childrenCount: data.childrenCount };
        return;
      }

      this.fields = CONSTANT.CUSTOM_FIELD_FOR_PROJECT;

      if (aitask) {
        this.id = aitask.id;
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
    this._aitaskService.get(this.id).subscribe((json: any) => {
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

