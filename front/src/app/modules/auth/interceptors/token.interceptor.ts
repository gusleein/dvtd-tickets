import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/do";
import {tap} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    req = req.clone({
      setHeaders: {
        _t: auth.getToken()
      }
    });
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => event,
        (res: HttpErrorResponse) => {
          // redirect to auth, if a token is broken
          if (res instanceof HttpErrorResponse && res.status === 401) {
            auth.clearStorage();
            auth.goToAuth();
            return res;
          }
          return res;
        },
        () => {
        },
      ),
    )
  }
}
