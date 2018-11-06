import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'issue-input',
  templateUrl: './issue-input.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueInputComponent implements OnInit, OnChanges {
  @Input() field: string;

  public constructor() {

  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public ngOnInit(): void {

  }
}
