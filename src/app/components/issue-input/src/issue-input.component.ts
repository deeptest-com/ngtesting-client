import {Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'issue-input',
  templateUrl: './issue-input.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueInputComponent implements OnInit, OnChanges {
  @Input() field: any;
  @Input() forSelection: boolean = false;

  @Output() propEvent = new EventEmitter<any>();

  labelColNum: number = 4;

  public constructor() {

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
    console.log('setFullLine', prop, val);

    this.propEvent.emit({ id: this.field.id, prop: prop, val: val });
  }

}
