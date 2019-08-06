import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.dev"
import * as helpers from "@core/shared/helpers";

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

  one(id: string): UserView {
    let list = this.all();
    return list.find((u: UserView) => u.id == id)
  }

  // находим пользователей с купленными билетами
  filterUsersByEvent(eventId: string): UserView[] {
    let result: UserView[] = [];
    let list = this.all();
    for (let u of list) {
      if (u.tickets.length > 0) {
        for (let t of u.tickets) {
          if (t.eventId == eventId) {
            result.push(u)
          }
        }
      }
    }
    return result;
  }

  private updateStorage(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  createTicket(userId: string, eventId: string, price: number): Observable<Ticket> {
    let finish$: Subject<Ticket> = new Subject();
    this.generateTicket(userId, eventId, price)
      .toPromise()
      .then(() => {
        this.fetch()
      })
      .catch(() => {
        this.fetch()
      });
    return finish$.asObservable();
  }

  fetch(fin?: Subject<UserView[]>) {
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

  private generateTicket(uId: string, eId: string, price: number): Observable<Ticket> {
    return this.http.get<Ticket>(
      environment.endpoint
      + `/tickets/create?user=${uId}`
      + `&event=${eId}`
      + `&price=${price}
      `);
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

  getTicketByEvent(eventId: string): Ticket {
    return this.tickets.find((t: Ticket) => t.eventId == eventId)
  }

  getTicketDate(eventId: string): string {
    let t = this.getTicketByEvent(eventId);
    return helpers.tsToStringDate(t.soldAt * 1000)
  }

  getTicketPrice(eventId: string): number {
    let t = this.getTicketByEvent(eventId);
    return t.price;
  }
}

export interface Ticket {
  uid: string;
  eventId: string;
  qrLink: string;
  soldAt: number;
  price: number;
}