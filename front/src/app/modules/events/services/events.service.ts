import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.dev"

@Injectable()
export class EventsService {
  update$: Subject<EventView[]> = new ReplaySubject();
  storageKey = 'events';

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

  private create(p: EventView): Observable<any> {
    return this.http.post(environment.endpoint + '/events/save', p);
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
}