import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.dev"

@Injectable()
export class UsersService {
  update$: Subject<UserView[]> = new ReplaySubject();
  storageKey = 'users';

  constructor(private http: HttpClient) {
  }

  all(): UserView[] {
    let result: UserView[] = [];
    let list = JSON.parse(localStorage.getItem(this.storageKey));
    for (let i of list) {
      result.push(new UserView(i))
    }
    return result;
  }

  fetch() {
    this.getAll()
      .toPromise()
      .then((a: UserView[]) => {
        localStorage.setItem(this.storageKey, JSON.stringify(a));
        this.update$.next(this.all())
      })
  }

  private getAll(): Observable<UserView[]> {
    return this.http.get<UserView[]>(environment.endpoint + '/user/list');
  }
}

export class UserView {
  public phone: string = '';
  public name: string = '';
  public lastName: string = '';
  public cardNumber: string = '';
  public tickets: Ticket[] = [];

  public id?: number | string = 0;

  constructor(u?: UserView) {
    if (u) {
      this.phone = u.phone;
      this.name = u.name;
      this.lastName = u.lastName;
      this.cardNumber = u.cardNumber;
      this.tickets = u.tickets;
      this.id = u.id;
    }
  }
}

export interface Ticket {
  uid: string;
  partyId: string;
  qrLink: string;
  soldAt: number;
}