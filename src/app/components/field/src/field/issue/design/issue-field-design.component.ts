import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

import {FormGroup} from "@angular/forms";
import {Deferred} from "../../../../../ztree/src/helpers";
import {logger} from "../../../../../../utils/utils";
import * as _ from "lodash";

@Component({
  selector: 'issue-field-design',
  templateUrl: './issue-field-design.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueFieldDesignComponent implements OnInit {
  @Input() issuePropMap: any = {};
  @Input() forSelection: boolean = false;

  @Input() form: FormGroup;

  @Output() propEvent = new EventEmitter<any>();

  @Input() field: any;

  labelColNum: number = 4;

  public constructor() {
  }

  public ngOnInit(): void {
    this.labelColNum = this.getCol();
  }

  public getCol(): number {
    let num;
    if (this.forSelection) {
      num = 3;
    } else {
      if (this.field.fullLine) {
        num = 2;
      } else {
        num = 4;
      }
    }

    return num;
  }

  setProp (data: any) {
    console.log('set', data);

    const deferred = new Deferred();
    deferred.promise.then((code) => {
      this.labelColNum = this.getCol();
    }).catch((err) => { logger.log('err', err); });

    this.propEvent.emit({
      data: data,
      deferred: deferred,
    });
  }

}
