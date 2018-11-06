import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WatchService {
  public configObservable = new Subject<number>();

  emitConfig(val) {
    this.configObservable.next(val);
  }

}

