/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 1/30/18.
 */
import {VERSION} from "@angular/core";
import * as uuid from "uuid";
import {UserClientData} from "../types";

export class UserClientHelper {

  public data: UserClientData;

  constructor(data: UserClientData) {
    this.data = {
      lang: data.lang || 'en',
      v: data.v || UserClientHelper.GetVersion(),
      os: data.os || UserClientHelper.GetBrowserVersion()
    }
  }

  static GetBrowserVersion(): string {
    return (function () {
      let ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();
  }

  static GetVersion() {
    return `Angular v${VERSION.full}`
  }

  static GenerateCid() {
    return uuid();
  }
}
