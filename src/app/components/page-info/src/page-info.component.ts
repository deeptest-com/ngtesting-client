import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'page-info',
  templateUrl: './page-info.html',
  styleUrls: ['./styles.scss']
})
export class PageInfoComponent implements OnInit {

  @Input() collectionSize: number;
  @Input() page: number;
  @Input() pageSize: number;

  constructor() {

  }

  ngOnInit(): any {

  }

}
