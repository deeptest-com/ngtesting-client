import {Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { NgbDatepicker, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'issue-field-design',
  templateUrl: './issue-field-design.html',
  styleUrls: ['./styles.scss'],
  providers: [NgbTimepickerConfig],
})
export class IssueFieldDesignComponent implements OnInit, OnChanges {
  @Input() issuePropMap: any = {};
  @Input() field: any;
  @Input() forSelection: boolean = false;

  @Input() form: FormGroup;

  @Output() propEvent = new EventEmitter<any>();

  labelColNum: number = 4;

  public constructor(config: NgbTimepickerConfig) {
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

  setProp ($event: any) {
    console.log('set', $event);
    this.propEvent.emit($event);
  }

}
