import {Injectable} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import {Alert, AlertType} from "./models/messages.model";

export const ALERT_TIMEOUT_MS = 5000;

@Injectable()
export class MessagesService {
  private subject$ = new Subject<Alert>();
  private clear$ = new Subject<number>();
  private keepAfterRouteChange = false;

  index: number = 0;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clearAll();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject$.asObservable();
  }

  clearAlert(): Observable<any> {
    return this.clear$.asObservable();
  }

  success(message: string, title = 'Great success', keepAfterRouteChange = false) {
    let a = new Alert(<Alert>{
      type: AlertType.Success,
      message: message,
      title: title,
      index: this.index
    });
    this.alert(a, keepAfterRouteChange);
    this.clearTimeout(a);
  }

  error(message: string, title = 'Fatal error', keepAfterRouteChange = false) {
    let a = new Alert(<Alert>{
      type: AlertType.Error,
      message: message,
      title: title,
      index: this.index
    });
    this.alert(a, keepAfterRouteChange);
    this.clearTimeout(a)
  }

  info(message: string, title = 'Important information', keepAfterRouteChange = false) {
    let a = new Alert(<Alert>{
      type: AlertType.Info,
      message: message,
      title: title,
      index: this.index
    });
    this.alert(a, keepAfterRouteChange);
    this.clearTimeout(a)
  }

  private alert(alert: Alert, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject$.next(alert);
    this.index++;
  }

  private clearAll() {
    this.subject$.next();
  }

  private clearTimeout(a: Alert) {
    setTimeout(() => this.clear$.next(a.index), ALERT_TIMEOUT_MS);
  }
}
