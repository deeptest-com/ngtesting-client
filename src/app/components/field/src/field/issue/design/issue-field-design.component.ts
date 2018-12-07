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

  }

  public getCol(): number {
    if (this.forSelection) {
      this.labelColNum = 3;
    } else {
      if (this.field.fullLine) {
        this.labelColNum = 2;
      } else {
        this.labelColNum = 4;
      }
    }

    return this.labelColNum;
  }

  setProp ($event: any) {
    console.log('set', $event);
    this.propEvent.emit($event);
  }

}
