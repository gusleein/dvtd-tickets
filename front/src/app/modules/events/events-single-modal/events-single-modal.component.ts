import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "../../ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "../../ui/modules/modal/components/custom-modal/custom-modal.component";
import {EventsService, EventView} from "../services/events.service";

@Component({
  selector: 'app-events-single-modal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        Карточка события
      </div>
      <div modal-content>
        <div class="ui basic segment">
          <div class="header">Название:</div>
          <div class="content">{{model.title}}</div>
        </div>
        <div class="ui basic segment">
          <div class="header">Дата проведения:</div>
          <div class="content">{{date}}</div>
        </div>
        <div class="ui basic segment">
          <div class="header">Цена билета:</div>
          <div class="content">{{model.price}}</div>
        </div>
      </div>
      <div modal-actions>
        <button class="ui button red" (click)="onCancel()">Закрыть</button>
      </div>
    </uiModal>
  `,
  styles: []
})
@Modal()
export class EventsSingleModalComponent extends CustomModalComponent implements OnInit {

  @Input() id: string;
  model: EventView = new EventView();
  date: string = '';

  constructor(private service: EventsService) {
    super();
  }

  ngOnInit() {
    this.model = this.service.one(this.id);
    this.date = (new Date(this.model.date * 1000)).toISOString().slice(0, 10)
  }
}
