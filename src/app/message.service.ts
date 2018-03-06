import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  private _listners = new Subject<any>();
  private _listenersUpdateDetails = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterById: number) {
       this._listners.next(filterById);
    }

    listenUpdateDetails(): Observable<any> {
       return this._listenersUpdateDetails.asObservable();
    }

    filterUpdateDetails(filterName: string) {
       this._listenersUpdateDetails.next(filterName);
    }

}
