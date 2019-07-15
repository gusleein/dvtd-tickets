import {Injectable} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import {Alert, AlertType} from "./models/messages.model";

export const ALERT_TIMEOUT_MS = 3000;

@Injectable()
export class MessagesService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, title = 'Great success', keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, title, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, ALERT_TIMEOUT_MS);
  }

  error(message: string, title = 'Fatal error', keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, title, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, ALERT_TIMEOUT_MS);
  }

  info(message: string, title = 'Important information', keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, title, keepAfterRouteChange);
    setTimeout(() => {
      this.clear();
    }, ALERT_TIMEOUT_MS);
  }

  private alert(type: AlertType, message: string, title: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{type: type, message: message, title: title});
  }

  private clear() {
    this.subject.next();
  }
}
