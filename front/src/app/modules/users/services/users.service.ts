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

  createTicket(userId: string, partyId: string) {
    this.createQR(userId, partyId)
      .toPromise()
      .then((t: Ticket) => {
        let user = this.all().find((u: UserView) => u.id == userId);
        // ищем вечеринку по id, если такой нет, то добавляем новый тикет
        let ticket = user.tickets.find((t: Ticket) => t.partyId == partyId);
        if (!ticket) {
          user.tickets.push(t)
        }
        this.updateStorage(this.all());
        this.update$.next(this.all());
      })
  }

  private updateStorage(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  fetch() {
    this.getAll()
      .toPromise()
      .then((items: UserView[]) => {
        this.updateStorage(items);
        this.update$.next(this.all());
      })
  }

  private getAll(): Observable<UserView[]> {
    return this.http.get<UserView[]>(environment.endpoint + '/user/list');
  }

  private createQR(userId: string, partyId: string): Observable<Ticket> {
    return this.http.get<Ticket>(environment.endpoint + `/qr/create`);
  }
}

export class UserView {
  public phone: string = '';
  public name: string = '';
  public lastName: string = '';
  public cardNumber: string = '';
  public tickets: Ticket[] = [];

  public id?: string;

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