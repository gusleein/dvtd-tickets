import {Component, Input, OnInit} from '@angular/core';
import {UsersService, UserView} from "@modules/users/services/users.service";
import {EventsService} from "@modules/events/services/events.service";

@Component({
  selector: 'app-users-create-ticket-table-row,[users-filter-table]',
  template: `
    <tr *ngFor="let u of list; let i = index" (click)="createTicket(u.id)">
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
        <i class="ui large ticket yellow icon link" (click)="viewTicket(u.id)"></i>
      </td>
    </tr>
  `,
  styles: []
})
export class UsersCreateTicketTableRowComponent implements OnInit {

  @Input() list: UserView[];

  constructor(private users: UsersService,
              private events: EventsService) {
  }

  ngOnInit() {
  }

  viewTicket(id: string) {

  }

  createTicket(id, eventId) {

  }

}
