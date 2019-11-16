import {Component, Input, OnInit} from '@angular/core';
import {Ticket, UsersService, UserView} from "@modules/users/users.service";
import {EventsService, EventView} from "@modules/events/services/events.service";
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import * as helpers from "@core/shared/helpers"

@Component({
  selector: 'app-users-ticket-modal',
  template: `
    <uiModal [size]="'fullscreen'">
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        <div class="ui grid">
          <div class="eight wide column">
            <h2 class="page-header">Билет</h2>
          </div>
          <div class="eight wide column">
            <h2 class="page-header">{{event.title}}  {{date}}</h2>
          </div>
        </div>
      </div>
      <div modal-content>
        <div class="ui grid">
          <div class="eight wide column">
            <img [src]="ticket.qrLink" [alt]="ticket.uid">
          </div>
          <div class="eight wide column">
            <div class="ui basic raised segment">
              <span class="ui red label">Дата:</span>
              <span>{{date}}</span><br>
              <span class="ui red label">Тип:</span>
              <span>Входной билет</span><br>
              <span class="ui red label">Номер билета:</span>
              <span>{{ticket.uid}}</span><br>
              <span class="ui red label">Владелец:</span>
              <span>{{user.name}} {{user.lastName}}</span><br>
              <span class="ui red label">Оплата:</span>
              <span>оплачено {{ticket.price}} руб. {{soldAt}}</span><br>
            </div>
          </div>
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
export class UsersTicketModalComponent extends CustomModalComponent implements OnInit {

  @Input() userId: string;
  @Input() eventId: string;

  user: UserView;
  event: EventView;
  date: string;
  soldAt: string;
  ticket: Ticket;

  constructor(private users: UsersService,
              private events: EventsService) {
    super();
  }

  ngOnInit() {
    this.user = this.users.one(this.userId);
    this.event = this.events.one(this.eventId);

    this.ticket = this.user.getTicketByEvent(this.eventId);
    this.date = helpers.tsToStringDate(this.event.date);
    this.soldAt = helpers.tsToStringDate(this.ticket.soldAt);
  }

}
