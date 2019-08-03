import {Component, OnInit} from '@angular/core';
import {EventsService, EventView} from "@modules/events/services/events.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {EventsCreateModalComponent} from "../../../modules/events/events-create-modal/events-create-modal.component";
import {EventsSingleModalComponent} from "@modules/events/events-single-modal/events-single-modal.component";
import {EventsEditModalComponent} from "@modules/events/events-edit-modal/events-edit-modal.component";
import * as _ from "underscore";

@Component({
  selector: 'app-events-list',
  template: `
    <div class="ui basic segment">
      <h2 class="page-header">Events</h2>
      <div class="action-buttons">
        <button class="ui medium right floated blue button" (click)="create()">
          <i class="plus icon"></i>
          Добавить
        </button>
      </div>
    </div>

    <table class="ui inverted unstackable striped table">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <i class="icon sort link" (click)="sortBy('date')"></i>
            date
          </th>
          <th>
            <i class="icon sort link" (click)="sortBy('title')"></i>
            title
          </th>
          <th>
            <i class="icon sort link" (click)="sortBy('price')"></i>
            price
          </th>
          <th>
            <i class="icon sort link" (click)="sortBy('modifyAt')"></i>
            lastModifyAt
          </th>
          <th class="center aligned">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of list; let num = index">
          <td>{{num + 1}}</td>
          <td>{{e.dateToString('date')}}</td>
          <td>{{e.title}}</td>
          <td>{{e.price}}</td>
          <td>{{e.dateToString('modifyAt')}}</td>
          <td>
            <i class="large pencil icon link gray" (click)="edit(e.id)" title="Редактировать"></i>
            <i class="large eye icon link gray" (click)="view(e.id)" title="Открыть"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </td>
        </tr>
      </tbody>
    </table>
    <uiModalPlaceholder></uiModalPlaceholder>
    <uiMessages></uiMessages>
  `,
  styles: []
})
export class EventsListComponent implements OnInit {

  list: EventView[] = [];
  sortingColumn: string = 'date';
  sortReverse: boolean = true;

  constructor(private events: EventsService,
              private modal: CustomModalService) {
  }

  ngOnInit() {
    this.events.update$.subscribe((list: EventView[]) => {
      list = _.sortBy(list, this.sortingColumn);
      if (this.sortReverse) list.reverse();
      this.list = list;
    });
    this.events.fetch();
  }

  create() {
    this.modal.create(EventsCreateModalComponent, {
      onClose: () => this.events.fetch()
    })
  }

  edit(id: string) {
    this.modal.create(EventsEditModalComponent, {
      id: id,
      onClose: () => this.events.fetch()
    })
  }

  view(id: string) {
    this.modal.create(EventsSingleModalComponent, {
      id: id
    })
  }

  sort() {
    this.list = _.sortBy(this.list, this.sortingColumn);
    if (this.sortReverse) this.list.reverse();
  }

  sortBy(by: string) {
    // если этот же столбик, то меняем направление сортировки
    this.toggleReverse();

    // если выбран другой столбик, то уст. направление сортировки по-умолчанию
    if (by !== this.sortingColumn) this.sortReverse = false;

    this.sortingColumn = by;
    this.sort();
  }

  toggleReverse() {
    this.sortReverse = !this.sortReverse;
  }
}
