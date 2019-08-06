import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService, UserView} from "@modules/users/services/users.service";
import {EventsService, EventView} from "@modules/events/services/events.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {MessagesService} from "@modules/ui/modules/messages/messages.service";

@Component({
  selector: 'app-users-create-ticket-table-row,[users-filter-table]',
  template: `
    <tr *ngFor="let u of list; let i = index">
      <td>{{i + 1}}</td>
      <td>
        {{u.cardNumber}}
      </td>
      <td>
        +{{u.phone}}
      </td>
      <td>
        {{u.name}} {{u.lastName}}
      </td>
      <td>
        <i class="ui large icons link"
           *ngIf="!u.getTicketByEvent(eventId)"
           (click)="openAddTicketModal(u)"
           title="Оформить билет">
          <i class="ticket yellow icon"></i>
          <i class="bottom right corner green add icon"></i>
        </i>
      </td>
    </tr>
  `,
  styles: []
})
export class UsersCreateTicketTableRowComponent implements OnInit {

  @Input() list: UserView[];
  @Input() eventId: string;
  @Output() close: EventEmitter<void> = new EventEmitter();

  event: EventView;


  constructor(private users: UsersService,
              private modal: CustomModalService,
              private messages: MessagesService,
              private events: EventsService) {
  }

  ngOnInit() {
    this.event = this.events.one(this.eventId)
  }

  openAddTicketModal(u: UserView) {
    let result = confirm(`Оформить билет на ${this.event.title} за ${this.event.price} руб?`);
    if (result) {
      this.users.createTicket(u.id, this.eventId, this.event.price);
      this.users.fetch();
      this.close.emit();
      this.messages.success('Билет оформлен!')
    }
  }
}
