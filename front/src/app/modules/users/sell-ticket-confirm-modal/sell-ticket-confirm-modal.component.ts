import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {UsersService, UserView} from "@modules/users/services/users.service";
import {EventsService, EventView} from "@modules/events/services/events.service";

@Component({
  selector: 'app-sell-ticket-confirm-modal',
  template: `
    <uiModal [size]="'fullscreen'">
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        <h4>Оформление билета</h4>
      </div>
      <div modal-content>
        <h3>Мероприятие: {{event.title}}</h3>
        <h3>Дата проведения: {{event.dateToString()}}</h3>
        <h3>Цена:
          <div class="ui input"><input type="text" [value]="event.price"></div>
        </h3>
      </div>
      <div modal-actions>
        <div class="ui inverted segment">
          <button class="ui button icon red" (click)="onCancel()"><i class="icon arrow left"></i>Назад</button>
          <button class="ui button icon red" (click)="confirm()"><i class="icon check green"></i>Оформить</button>
        </div>
      </div>
    </uiModal>
  `,
  styles: []
})
@Modal()
export class SellTicketConfirmModalComponent extends CustomModalComponent implements OnInit {

  @Input() eventId: string;
  @Input() userId: string;
  user: UserView;
  event: EventView;

  constructor(private users: UsersService,
              private events: EventsService) {
    super()
  }

  ngOnInit() {
    this.user = this.users.one(this.userId);
    this.event = this.events.one(this.eventId);
  }

  confirm() {

  }
}
