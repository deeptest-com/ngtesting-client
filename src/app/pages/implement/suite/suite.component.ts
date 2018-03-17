import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nga-suite',
  styleUrls: ['./suite.scss'],
  templateUrl: './suite.html',
})
export class SuiteComponent {

  constructor(private _route: ActivatedRoute) {

  }

}
