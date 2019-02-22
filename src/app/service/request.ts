import * as _ from 'lodash';

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {CONSTANT} from '../utils/constant';
import {RouteService} from './route';

@Injectable()
export class RequestService {

  constructor(private http: Http, private routeService: RouteService) {

  }

  post(apiPath: string, reqBody: any) {
    const me = this;

    const url = CONSTANT.API_URL + apiPath;

    const body = JSON.stringify(reqBody, (key, value) => {
      return key == 'createTime' || key == 'updateTime' ? undefined : value;
    });

    const headers = new Headers({
      'Content-Type': 'application/json',
      'token': CONSTANT.TOKEN
    });
    const options = new RequestOptions({headers: headers, withCredentials: true});

    console.log(url, body);
    return this.http.post(url, body, options)
      .map(
        function (res) {
          const json = res.json();
          console.log(json);
          if (json.code && json.code > 0) {

          } else if (json.code == -100) {
            me.routeService.navTo('/login');
          } else {
            me.handleError(json);
          }
          return json;
        },
      )
      .catch(this.handleError);
  }

  // get(apiPath: string) {
  //   const me = this;
  //   const url = CONSTANT.API_URL + apiPath;
  //
  //   console.log(url);
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   const options = new RequestOptions({ headers: headers });
  //
  //   return this.http.get(url, options)
  //     .map(
  //       function(res) {
  //         const json = res.json();
  //         console.log(json);
  //         if (json.code && json.code > 0) {
  //
  //         } else if (json.code == -100) {
  //           me.routeService.navTo('/login');
  //         } else {
  //           me.handleError(json);
  //         }
  //         return json;
  //       },
  //     )
  //     .catch(this.handleError);
  // }
  //
  // delete(apiPath: string) {
  //   const me = this;
  //   const url = CONSTANT.API_URL + apiPath;
  //
  //   console.log(url);
  //   const headers = new Headers({ 'Content-Type': 'application/json', 'token': 'test' });
  //   const options = new RequestOptions({ headers: headers });
  //
  //   return this.http.delete(url, options)
  //     .map(
  //       function(res) {
  //         const json = res.json();
  //         console.log(json);
  //
  //         if (json.code && json.code > 0) {
  //
  //         } else if (json.code == -100) {
  //           me.routeService.navTo('/login');
  //         } else {
  //           me.handleError(json);
  //         }
  //         return json;
  //       },
  //     )
  //     .catch(this.handleError);
  // }

  handleError(json: any) {
    console.error('ERROR:' + json.msg);

    if (json.code != -110) {
      return Observable.throw(json.msg || 'Server error');
    }
  }
}
