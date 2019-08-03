import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {UsersService, UserView} from "@modules/users/services/users.service";
import {EventsService, EventView} from "@modules/events/services/events.service";
import * as _ from "underscore"

@Component({
  selector: 'app-users-create-ticket-modal',
  template: `
    <uiModal [size]="'fullscreen'">
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        <h4>Оформление билета</h4>
      </div>
      <div modal-content>
        <div class="ui basic segment">
          <h3 class="header">{{event.dateToString()}} | {{event.title}}</h3>
          <div class="ui grid">
            <div class="five wide column">
            </div>
            <div class="six wide column">
              <h4 class="page-header">Поиск по участникам</h4>
              <div class="ui form">
                <div class="field">
                  <div class="ui huge transparent icon input">
                    <input [(ngModel)]="searchQuery"
                           type="text"
                           placeholder="Search..."
                           (keyup)="onChangeSearch()"
                    >
                    <i class="search icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="ui inverted selectable unstackable striped table">
          <thead>
            <tr>
              <th>#</th>
              <th>card number</th>
              <th>phone</th>
              <th class="cell center aligned">name</th>
              <th class="center aligned">actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of filteredUsers; let i = index">
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
export class UsersCreateTicketModalComponent extends CustomModalComponent implements OnInit {

  @Input() eventId: string;
  users: UserView[] = [];
  filteredUsers: UserView[] = [];
  event: EventView;

  searchQuery: string;

  constructor(private usersService: UsersService,
              private eventsService: EventsService) {
    super();
  }

  ngOnInit() {
    let list = this.usersService.all();
    // оставим только пользователей без билетов
    for (let u of list) {
      let t = u.getTicketByEvent(this.eventId);
      if (!t) {
        this.users.push(u);
        this.filteredUsers.push(u);
      }
    }

    this.event = this.eventsService.one(this.eventId);
  }

  viewTicket(id: string) {

  }

  onChangeSearch() {
    this.updateList();
  }

  updateList() {
    this.filteredUsers = this.filter(this.searchQuery);
  }

  filter(query: string): UserView[] {
    return _.filter(this.users, (u: UserView) =>
      u.cardNumber.includes(query) ||
      u.name.includes(query) ||
      u.lastName.includes(query) ||
      u.phone.includes(query)
    );
  }
}
