import {Input, Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'issue-input-edit',
  templateUrl: './issue-input-edit.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class IssueInputEditComponent implements OnInit, OnChanges {
  @Input() issue: any = {};
  @Input() elem: any = {};
  @Input() issuePropMap: any = {};

  @Output() propEvent = new EventEmitter<any>();

  labelColNum: number = 4;

  public constructor() {

  }

  public ngOnInit(): void {
    if (!this.issue[this.elem.code] && this.issuePropMap[this.elem.code]) {
      const defaults: any[] = this.issuePropMap[this.elem.code].filter(
        (option, index) => option.isDefault == true);
      if (defaults.length > 0) {
        this.issue[this.elem.code] = defaults[0].id;

        console.log('====', this.elem.code, this.issue[this.elem.code]);
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public getCol(): number {
    if (this.elem.fullLine) {
      this.labelColNum = 2;
    } else {
      this.labelColNum = 4;
    }
    return this.labelColNum;
  }

  set (prop: string, val: any) {
    console.log('set', prop, val);

    this.propEvent.emit({ id: this.elem.id, prop: prop, val: val });
  }

}
