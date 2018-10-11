import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CONSTANT } from '../../../../utils/constant';

@Component({
  selector: 'prj',
  template: `
    <div class="prj">
      <router-outlet></router-outlet>
    </div>
  `
})
export class Prj {
  prjId: number;

  constructor(private _route: ActivatedRoute) {

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.prjId = params['prjId'];
    });
    console.log('==Current Prj', this.prjId, CONSTANT.CURR_PRJ_ID);
  }
}
