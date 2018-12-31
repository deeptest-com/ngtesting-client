import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';

import {FormGroup} from "@angular/forms";

@Component({
  selector: 'issue-field-design',
  templateUrl: './issue-field-design.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueFieldDesignComponent implements OnInit {
  @Input() issuePropMap: any = {};
  @Input() field: any;
  @Input() forSelection: boolean = false;

  @Input() form: FormGroup;

  @Output() propEvent = new EventEmitter<any>();

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

  setProp ($event: any) {
    console.log('set', $event);
    this.propEvent.emit($event);
  }

}
