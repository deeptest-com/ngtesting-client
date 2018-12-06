import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

import { Utils } from '../../../../../../utils/utils';

import * as _ from 'lodash';

@Component({
  selector: 'label-issue-design',
  templateUrl: './label-issue-design.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class LabelIssueDesignComponent implements OnInit {
  @Input() elem: any = {};
  @Output() propEvent = new EventEmitter<any>();

  public constructor() {

  }

  public ngOnInit(): void {

  }

  set (prop: string, val: any) {
    console.log('set', prop, val, this.elem);
    this.propEvent.emit({ id: this.elem.id, prop: prop, val: val });
  }
}
