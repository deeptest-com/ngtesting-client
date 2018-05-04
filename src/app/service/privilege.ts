import * as _ from "lodash";

import {Injectable} from "@angular/core";

import {CONSTANT} from "../utils/constant";

@Injectable()
export class PrivilegeService {
  hasPrivilege(privs: string, myPrivs?: any) {
    let ret = true;

    if (!myPrivs) {
      myPrivs = CONSTANT.PRJ_PRIVILEGES
    }

    let arr = privs.split(',');
    // console.log('arr', arr);
    for (let i = 0; i < arr.length; i++) {
      let not = false;
      let priv = arr[i];
      if (priv.startsWith('!')) { // 非运算
        priv.replace('!', '');
        not = true;
      }

      if (!myPrivs[arr[i]]) {
        ret = false;
        break;
      }

      if (not) {
        ret = !ret;
      }

      if (!ret) {
        break;
      }
    }

    return ret;
  }
}


