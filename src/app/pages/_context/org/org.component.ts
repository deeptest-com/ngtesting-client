import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONSTANT } from '../../../utils/constant';

@Component({
  selector: 'org',
  template: `
    <div class="org">
      <router-outlet></router-outlet>
    </div>
  `
})
export class Org {
  orgId: number;

  constructor(private _route: ActivatedRoute) {

  }
  ngOnInit() {

  }
}
