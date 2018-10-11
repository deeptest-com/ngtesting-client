import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { CONSTANT } from '../../utils/constant';
import { WS_CONSTANT } from '../../utils/ws-constant';
import { GlobalState } from '../../global.state';
import { StompRService } from '@stomp/ng2-stompjs';
declare var SockJS;
declare var Stomp;

@Injectable()
export class SockService {
  private uri: string = 'websocket';

  private url: string;
  private sock: any;
  private stompClient: any;
  private _opened: boolean = false;
  private handlers = {};

  constructor(private _state: GlobalState, private _stompService: StompRService) {
    this.url = CONSTANT.API_URL + this.uri;
  }

  public init(): void {
    const url = new SockJS(CONSTANT.API_URL + 'websocket');
    const stompConfig = {
      url: url,

      // Typical keys: login, passcode, host
      headers: {
        // login: 'guest',
        // passcode: 'guest'
      },

      // How often to heartbeat?
      // Interval in milliseconds, set to 0 to disable
      heartbeat_in: 0, // Typical value 0 - disabled
      heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
      // Wait in milliseconds before attempting auto reconnect
      // Set to 0 to disable
      // Typical value 5000 (5 seconds)
      reconnect_delay: 5000,

      // Will log diagnostics on console
      debug: false,
    };

    this._stompService.config = stompConfig;
    this._stompService.initAndConnect();

    const stompSub1 = this._stompService.subscribe('/topic/comm');
    stompSub1.map((message: any) => {
      return message.body;
    }).subscribe((msg: string) => {
      console.log('======/topic/comm received: ');
      console.log('      ', msg);

      const json = JSON.parse(msg);

      if (json.code != 1) {
        console.log(json.code);
        return;
      }
    });

    const stompSub2 = this._stompService.subscribe('/user/' + CONSTANT.TOKEN + '/notification');
    stompSub2.map((message: any) => {
      return message.body;
    }).subscribe((msg: string) => {
      console.log('======/user/' + CONSTANT.TOKEN + '/notification received: ');
      console.log('      ', msg);

      const json = JSON.parse(msg);
      const payload = JSON.parse(json.payload);

      if (payload.code != 1) {
        console.log(payload.code);
        return;
      }

      this._state.notifyDataChanged(payload.type, payload);
    });

    this._stompService.publish('/send/comm', JSON.stringify( { type: WS_CONSTANT.WS_OPEN } ));
  }

  // public connect(): void {
  //   const that = this;

  //   console.log('try to connect ws ', that._opened, that.url);
  //
  //   that.sock = new SockJS(that.url);
  //   that.stompClient = Stomp.over(that.sock);
  //   that.stompClient.connect({}, (frame) => that.success, (error) => that.failure);
  // }
  //
  // public success (frame) {
  //   const that = this;
  //   that._opened = true;
  //   console.log('websocket open');
  //
  //   that.stompClient.subscribe('/topic/comm', function (json) {
  //     const body = JSON.parse(json.body);
  //     console.log('==/topic/comm==', body);
  //     if (body.code != 1) {
  //       console.log(body.code);
  //       return;
  //     }
  //
  //     that._state.notifyDataChanged(json.type, json);
  //   });
  //   that.stompClient.subscribe('/user/' + CONSTANT.TOKEN + '/notification', function (json) {
  //     const body = JSON.parse(json.body);
  //     const payload = JSON.parse(body.payload)
  //     console.log('==/user/queue/notification==', payload);
  //     if (payload.code != 1) {
  //       console.log(payload.code);
  //       return;
  //     }
  //
  //     that._state.notifyDataChanged(payload.type, payload);
  //   });
  //
  //   that.send({
  //     type: WS_CONSTANT.WS_OPEN
  //   });
  // }
  //
  // public failure (error) {
  //   const that = this;
  //   this._opened = false;
  //
  //   console.log('websocket close');
  //
  //   setTimeout(that.connect, 10000);
  //   console.log('websocket reconecting ...');
  // };
  //
  //
  // public send (data: any) {
  //   if (this._opened) {
  //     var msg = JSON.stringify(data);
  //     this.stompClient.send('/send/comm', {}, msg);
  //   }
  // }

}

