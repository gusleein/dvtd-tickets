import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "@env/environment.dev";
import {LocalStorageService} from "@core/shared/services/local-storage.service";
import {AuthPhoneConfirmData, AuthSignInData, AuthUser} from "../../shared/types";
import {UserClientHelper} from "@modules/core/shared/helpers/user-client-helper";

@Injectable()
export class AuthService {

  private storageKey: string = '_t';

  constructor(public http: HttpClient,
              private storage: LocalStorageService,
              private router: Router) {
    // для синхронизации вкладок слушаем изменения в localStorage
    window.addEventListener('storage', (e) => this.onStorage(e), false)
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== ''
  }

  public signOut() {
    this.clearStorage();
    this.goToAuth();
  }

  // действия для синхронизации вкладок при изменении localStorage
  onStorage(e: StorageEvent) {
    if (e.key == 'action' && e.newValue == 'signout') {
      this.goToAuth();
      return
    }
  }

  crossTabsAction(action: string) {
    localStorage.setItem('action', action);
    localStorage.removeItem('action')
  }

  public signIn(authData: AuthSignInData): Promise<boolean> {
    return this.http.post<boolean>(`${env.endpoint}/user/auth`, authData)
      .toPromise()
  }

  public confirm(confirmData: AuthPhoneConfirmData): Promise<AuthUser> {
    return this.http.post<AuthUser>(`${env.endpoint}/user/confirm`, confirmData)
      .toPromise()
  }

  // get token from localStorage
  public getToken(): string {
    return this.storage.getItem(this.storageKey) || '';
  }

  // set token to localStorage
  public setToken(t): void {
    this.storage.setItem(this.storageKey, t)
  }

  // get client id from localStorage
  public getCid(): string {
    return this.storage.getItem('cid') || '';
  }

  // при первой инициализации генерим уникальный id клиента
  public initCid() {
    if (!this.storage.getItem('cid') || this.storage.getItem('cid').length !== 36) {
      this.storage.setItem('cid', UserClientHelper.GenerateCid());
    }
  }

  // у клиента должен сохраняться его уникальный id
  public clearStorage(): void {
    this.crossTabsAction('signout');
    let cid = this.storage.getItem('cid');
    // clear storage (except 'cid')
    this.storage.clear();
    this.storage.setItem('cid', cid);
  }

  public goToAuth() {
    this.router.navigate(['/auth/signin'])
  }
}
