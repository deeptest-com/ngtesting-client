import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'issue-query',
  styleUrls: ['./issue-query.scss'],
  templateUrl: './issue-query.html',
})
export class IssueQuery {

  constructor(private _route: ActivatedRoute) {

  }

}
