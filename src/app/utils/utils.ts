import { Injectable } from '@angular/core';

import { CONSTANT } from '../utils/constant';
import { environment } from '../../environments/environment';

declare var unescape;

export let Utils: any = {
  config: function() {
    if (environment.SERVICE_URL) {
      CONSTANT.SERVICE_URL = environment.SERVICE_URL;
    } else {
      const url = unescape(window.location.href);
      CONSTANT.SERVICE_URL = url.split('#')[0].split('index.html')[0];
    }

    CONSTANT.API_URL = CONSTANT.SERVICE_URL + CONSTANT.API_PATH;
  },

  strToDate: function(str: string) {
    return new Date(str);
  },
  strToTimestamp: function(str: string) {
      return new Date(str).getTime();
  },

  pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  },

  imgUrl: function(url: string, external: boolean, defaultt: string){
    if (!url) {
      if (defaultt) {
        url = defaultt;
      } else {
        url = 'img/1-1.png';
      }
    }

    if (!external) {
        external = true;
    }

    if (external) {
        url = CONSTANT.SERVICE_URL + url;
    }
    return url;
  },

  thumbUrl: function(url: string, external: boolean){
    if (!url) {
      url = 'img/none.png';
    }

    url = url.replace('.', '-thumb.');

    if (!external) {
      external = true;
    }

    if (external) {
      url = CONSTANT.SERVICE_URL + url;
    }
    return url;
  },
  getUrlParam: function (pname) {
    let rt = '';
    let url = unescape(window.location.href);
    url = url.split('#')[1];

    const allArgs = url.split('?')[1];
    if (!allArgs) {
      return '';
    }
    const args = allArgs.split('&');
    for (let i = 0; i < args.length; i++) {
      const arg = args[i].split('=');
      if (arg[0] == pname) {
        console.log('find url param: ' + arg[0] + '="' + arg[1] + '";');
        rt = arg[1];
        return rt;
      }
    }
    return rt;
  },

  getRouterUrlParam: function (url: string, param: string) {
    let rt = '';
    const reg = new RegExp('.*' + param + '=(.*)(;|$)');
    const r = url.match(reg);
    if (r != null) {
      rt = decodeURIComponent(r[1]);
    }
    return rt;
  },

  getScreenSize: function() {
    let sh = window.screen.height;
    if (document.body.clientHeight < sh) {
      sh = document.body.clientHeight;
    }

    let sw = window.screen.width;
    if (document.body.clientWidth < sw) {
      sw = document.body.clientWidth;
    }

    return { h: sh, w: sw };
  },

  getContainerHeight: function (h: number) {
    let height = CONSTANT.ScreenSize.h - h;
    if (height < 300) {
      height = 300;
    }

    console.log(CONSTANT.ScreenSize.h, h, height);
    return height + 'px';
  },

  getOrgAndPrjId: function (url: string) {
    let orgId, prjId;

    // #/pages/org/5/prjs/18/view
    // #/pages/org/5/prj/18/design/case

    if (url.indexOf('pages/org/') > -1) {
      const str = url.split('org/')[1];
      orgId = str.split('/')[0];
      if (str.indexOf('prjs/') > -1) {
        prjId = str.split('prjs/')[1].split('/')[0];
      } else if (str.indexOf('prj/') > -1) {
        prjId = str.split('prj/')[1].split('/')[0];
      }
    }
    const ret = { orgId: orgId, prjId: prjId };
    console.log('url params: ', ret);
    return ret;
  },

  changeOrder: function (arr: any[], act: string, idx: number) {
    let otherIdx: number;
    if (act == 'up') {
      otherIdx = idx - 1;
    } else {
      otherIdx = idx + 1;
    }
    const temp = arr[otherIdx];
    const curr = arr[idx];
    const tempOrdr = temp.ordr;
    const currOrdr = curr.ordr;

    arr[otherIdx] = arr[idx];
    arr[idx] = temp;

    arr[idx].ordr = currOrdr;
    arr[otherIdx].ordr = tempOrdr;
  },

  download(url) {
    const form = $('<form>');
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'get');
    form.attr('action', CONSTANT.SERVICE_URL + url);
    $('body').append(form);
    form.submit();
  },

  reverseOrder(newCond, orderBy: any[]): any[] {
    let indx = -1;
    let newVal = 'asc';
    orderBy.forEach((it, index) => {
      if (it.key == newCond) {
        indx = index;
        if (it.val == 'asc') {
          newVal = 'desc';
        }
      }
    });

    if (indx > -1) {
      orderBy.splice(indx, 1);
    }
    orderBy.unshift({ key: newCond, val: newVal });

    orderBy = orderBy.slice(0, 2);

    console.log('Utils.reverseOrder', orderBy);

    return orderBy;
  },
};

export class Deferred {
  promise: Promise<any>;

  resolve: any;
  reject: any;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export const logger: any = {
  log: function (msg: any) {
  // tslint:disable-next-line:no-console
    console.log(msg);
  },
  warn: function (msg: any) {
    console.warn(msg);
  },
  error: function (msg: any) {
    console.error(msg);
  },
};
