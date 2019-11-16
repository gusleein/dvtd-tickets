import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.dev"
import * as helpers from "@core/shared/helpers"

@Injectable()
export class EventsService {
  update$: Subject<EventView[]> = new ReplaySubject();
  storageKey = 'events';
  list: EventView[] = [];

  constructor(private http: HttpClient) {
  }

  all(): EventView[] {
    let result: EventView[] = [];
    let list = JSON.parse(localStorage.getItem(this.storageKey));
    for (let i of list) {
      result.push(new EventView(i))
    }
    return result;
  }

  one(id: string): EventView {
    let list = this.all();
    return list.find((e: EventView) => e.id == id)
  }

  // предстоящее событие
  upcoming(): EventView {
    let list = this.all();
    // сегодня +2 дня
    let now = Date.now() + 2 * 24 * 3600 * 1000;
    return list.find((e: EventView) => e.date * 1000 > now)
  }

  fetch() {
    this.getAll()
      .toPromise()
      .then((items: EventView[]) => {
        this.updateStorage(items);
        this.update$.next(this.all());
      })
  }

  private updateStorage(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private getAll(): Observable<EventView[]> {
    return this.http.get<EventView[]>(environment.endpoint + '/events/list');
  }

  public save(e: EventView): Promise<any> {
    return this.http.post(environment.endpoint + '/events/save', e).toPromise();
  }
}

export class EventView {

  public id?: string;
  public title: string = '';
  public price: number = 0;
  public date: number = 0;
  public createdAt: number = 0;
  public modifyAt: number = 0;


  constructor(e?: EventView) {
    if (e) {
      this.title = e.title;
      this.price = e.price;
      this.date = e.date;
      this.createdAt = e.createdAt;
      this.modifyAt = e.modifyAt;
      this.id = e.id;
    }
  }

  dateToString(key?: string): string {
    if (key) {
      if (!this[key]) this[key] = helpers.parseTsFromInt(Date.now());
      return helpers.tsToStringDate(this[key]);
    }
    // если значение не устанавлено, то уст. текущую дату
    if (!this.date) this.date = helpers.parseTsFromInt(Date.now());
    return helpers.tsToStringDate(this.date);
  }

  setDateFromString(date: string) {
    this.date = helpers.parseTsFromString(date)
  }

  parseDateFromString(date: string): number {
    return helpers.parseTsFromString(date)
  }
}