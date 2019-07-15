import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.goToAuth();
    return false;
  }
}
