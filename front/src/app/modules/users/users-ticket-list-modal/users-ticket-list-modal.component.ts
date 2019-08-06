import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {Ticket, UsersService} from "@modules/users/services/users.service";
import {EventsService, EventView} from "@modules/events/services/events.service";
import * as helpers from "@core/shared/helpers"

@Component({
  selector: 'app-users-ticket-list-modal',
  template: `
    <uiModal [size]="'fullscreen'">
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        <div class="ui grid">
          <div class="eight wide column">
            <h2 class="page-header">Купленные билеты</h2>
          </div>
        </div>
      </div>
      <div modal-content>
        <table class="ui inverted unstackable fixed striped table">
          <thead>
            <tr>
              <th>Дата покупки</th>
              <th>Мероприятие</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of tickets">
              <td>{{tsToString(t.soldAt)}}</td>
              <td>{{getEventTitle(t.eventId)}}</td>
              <td>{{t.price}} руб.</td>
              <td>
                <i class="icon yellow ticket link"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div modal-actions>
        <button class="ui button red" (click)="onCancel()">Закрыть</button>
      </div>
    </uiModal>
  `,
  styles: []
})
@Modal()
export class UsersTicketListModalComponent extends CustomModalComponent implements OnInit {

  @Input() userId: string;

  tickets: Ticket[] = [];
  events: EventView[] = [];

  constructor(private users: UsersService, private eventsService: EventsService) {
    super()
  }

  ngOnInit() {
    this.tickets = this.users.getTickets(this.userId);
    this.events = this.eventsService.all()
  }

  getEventTitle(eventId: string) {
    let e = this.events.find((e: EventView) => e.id == eventId);
    return e.title;
  }

  tsToString(ts: number) {
    return helpers.tsToStringDate(ts)
  }

}
