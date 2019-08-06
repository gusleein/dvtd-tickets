import {Component, OnInit} from '@angular/core';
import {EventsService, EventView} from "@modules/events/services/events.service";
import {UsersService, UserView} from "@modules/users/services/users.service";
import {MessagesService} from "@modules/ui/modules/messages/messages.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {UsersSingleModalComponent} from "@modules/users/users-single-modal/users-single-modal.component";
import {UsersTicketModalComponent} from "@modules/users/users-ticket-modal/users-ticket-modal.component";
import {UsersCreateTicketModalComponent} from "@modules/users/users-create-ticket-modal/users-create-ticket-modal.component";
import * as _ from "underscore";

@Component({
  selector: 'app-tickets',
  template: `
    <div class="ui grid">
      <div class="ten wide column">
        <div class="ui basic segment">
          <h2 class="page-header">Продажа билетов на "{{event.title}}"</h2>
          <h4 class="page-header">Дата проведения: {{date}}</h4>
          <h4 class="page-header">Цена билета: {{event.price}}.00 руб.</h4>
        </div>
      </div>
      <div class="six wide column">

        <div class="ui basic segment">
          <button class="ui large orange button" (click)="sellTicket()">Оформить билет</button>
        </div>
      </div>
    </div>
    <div class="ui basic segment">

      <div class="ui grid">
        <div class="nine wide column">
          <h3 class="header">Проданные билеты</h3>
        </div>
        <div class="six wide column">
          <h4 class="page-header">Поиск по участникам</h4>
          <div class="ui form">
            <div class="field">
              <div class="ui huge icon input">
                <input [(ngModel)]="query"
                       type="text"
                       placeholder="Search..."
                       (keyup)="onChangeSearch()"
                >
                <i class="search icon"></i>
              </div>
            </div>
          </div>
        </div>
        <h2 class="page-header"></h2>
      </div>
      <table class="ui inverted unstackable fixed striped table">
        <thead>
          <tr>
            <th>#</th>
            <th>card number</th>
            <th>phone</th>
            <th class="cell center aligned">name</th>
            <th>дата продажи</th>
            <th class="cell center aligned">куплен по цене</th>
            <th class="center aligned">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of listToShow; let i = index">
            <td>{{i + 1}}</td>
            <td>
              {{u.cardNumber}}
            </td>
            <td>
              +{{u.phone}}
            </td>
            <td>
              <a (click)="viewUser(u.id)">{{u.name}} {{u.lastName}}</a>
            </td>
            <td>{{u.getTicketDate(event.id)}}</td>
            <td>{{u.getTicketPrice(event.id)}}.00 руб.</td>
            <td>
              <i class="ui large ticket yellow icon link" (click)="viewTicket(u.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <uiModalPlaceholder></uiModalPlaceholder>
      <uiMessages></uiMessages>
  `,
  styles: []
})
export class TicketsComponent implements OnInit {
  event: EventView;
  date: string;
  soldUsers: UserView[];
  listToShow: UserView[];

  query: string = '';


  constructor(private eventsService: EventsService,
              private usersService: UsersService,
              private modal: CustomModalService,
              private messages: MessagesService,
  ) {
  }

  ngOnInit() {
    // изменение данных по событию
    this.eventsService.update$.subscribe(() => {
      this.messages.info("", "Обновлена информация по событию.");
      this.event = this.eventsService.upcoming();
    });
    this.event = this.eventsService.upcoming();

    // подписываемся на покупку билетов
    this.usersService.update$.subscribe(() => {
      this.soldUsers = this.usersService.filterUsersByEvent(this.event.id);
      this.filter();
    });
    this.usersService.fetch();

    this.date = (new Date(this.event.date * 1000)).toISOString().slice(0, 10);

    // проходим по списку пользователей и получаем проданные билеты на текущее событие
    this.soldUsers = this.usersService.filterUsersByEvent(this.event.id);
    this.listToShow = this.soldUsers;
    console.log(this.soldUsers)
  }

  onChangeSearch() {
    if (this.query.length > 0) {
      this.filter();
      return
    }
    this.listToShow = this.usersService.filterUsersByEvent(this.event.id);
  }

  filter() {
    this.listToShow = _.filter(this.soldUsers, (u: UserView) =>
      u.cardNumber.includes(this.query) ||
      u.name.includes(this.query) ||
      u.lastName.includes(this.query) ||
      u.phone.includes(this.query)
    );
  }

  viewUser(id: string) {
    this.modal.create(UsersSingleModalComponent, {id: id})
  }

  viewTicket(userId: string) {
    this.modal.create(UsersTicketModalComponent, {
      userId: userId,
      eventId: this.event.id,
    })
  }

  sellTicket() {
    this.modal.create(UsersCreateTicketModalComponent, {
      eventId: this.event.id,
    })
  }
}
