import {Component, OnInit} from '@angular/core';
import {EventsService, EventView} from "@modules/events/services/events.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {EventsCreateModalComponent} from "../events-create-modal/events-create-modal.component";

@Component({
  selector: 'app-events-list',
  template: `
    <a [routerLink]="'/'">home</a>
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
          <th>id</th>
          <th class="cell center aligned">title</th>
          <th class="cell center aligned">price</th>
          <th>date</th>
          <th>createdAt</th>
          <th>modifyAt</th>
          <th class="center aligned">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of list">
          <td>{{e.id}}</td>
          <td>{{e.title}}</td>
          <td>{{e.price}}</td>
          <td>{{e.date}}</td>
          <td>{{e.createdAt}}</td>
          <td>{{e.modifyAt}}</td>
          <td>
            <i class="large pencil icon link gray" [routerLink]="['single/' + e.id]" title="Редактировать"></i>
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

  constructor(private events: EventsService,
              private modal: CustomModalService) {
  }

  ngOnInit() {
    this.events.update$.subscribe((list: EventView[]) => {
      this.list = list
    });
    this.events.fetch();
  }

  create() {
    this.modal.create(EventsCreateModalComponent, {
      onClose: () => this.events.fetch()
    })
  }

}
