import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'issue-input',
  templateUrl: './issue-input.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueInputComponent implements OnInit, OnChanges {
  @Input() field: any;
  @Input() forSelection: boolean = false;
  labelColNum: number = 4;

  public constructor() {

  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public ngOnInit(): void {
    if (this.forSelection) {
      this.labelColNum = 3;
    } else if (this.field.fullLine) {
      this.labelColNum = 2;
    }
  }
}
