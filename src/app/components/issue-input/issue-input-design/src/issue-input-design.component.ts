import {Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { NgbDatepicker, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'issue-input-design',
  templateUrl: './issue-input-design.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class IssueInputDesignComponent implements OnInit, OnChanges {
  @Input() issuePropMap: any = {};
  @Input() field: any;
  @Input() forSelection: boolean = false;

  @Output() propEvent = new EventEmitter<any>();

  labelColNum: number = 4;
  startDate: any;

  public constructor(config: NgbTimepickerConfig) {
    config.seconds = true;
    config.spinners = false;

    const now = new Date();
    this.startDate = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
  }

  public ngOnChanges(changes: SimpleChanges): void {

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

  set (prop: string, val: any) {
    console.log('setFullLine', prop, val, this.field);
    this.propEvent.emit({ id: this.field.id, prop: prop, val: val });
  }

}
