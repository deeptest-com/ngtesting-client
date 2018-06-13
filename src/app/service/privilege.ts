import * as _ from 'lodash';

import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';

@Injectable()
export class PrivilegeService {
  hasPrivilege(privs: string, myPrivs?: any) {
    if (!myPrivs) {
      myPrivs = CONSTANT.PRJ_PRIVILEGES;
    }
    console.log('===', myPrivs);
    const arr = privs.split('|');
    for (let i = 0; i < arr.length; i++) {
      const priv = arr[i];
      console.log('---', priv);

      if (myPrivs[priv]) {
        return true;
      }
    }

    return false;
  }
}

