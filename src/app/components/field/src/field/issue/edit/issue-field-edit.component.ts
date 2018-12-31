import { Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'issue-field-edit',
  templateUrl: './issue-field-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueFieldEditComponent implements OnInit {
  @Input() model: any = {};
  @Input() elem: any;
  @Input() issuePropMap: any = {};

  @Input() form: FormGroup;
  @Input() validateMsg: any = {};

  labelColNum: number = 4;

  public constructor() {
  }

  public ngOnInit(): void {
    this.labelColNum = this.getCol();
  }

  public getCol(): number {
    let num;

    if (this.elem.fullLine) {
      num = 2;
    } else {
      num = 4;
    }

    return num;
  }
}
