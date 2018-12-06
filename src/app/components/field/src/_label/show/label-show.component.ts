import { Input, Component, OnInit } from '@angular/core';

import { Utils } from '../../../../../utils/utils';

import * as _ from 'lodash';

@Component({
  selector: 'label-show',
  templateUrl: './label-show.html',
  styleUrls: ['./styles.scss'],
  providers: [],
})
export class LabelShowComponent implements OnInit {
  @Input() elem: any = {};

  public constructor() {

  }

  public ngOnInit(): void {

  }
}
