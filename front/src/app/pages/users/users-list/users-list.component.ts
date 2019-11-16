import {Component, OnInit} from '@angular/core';
import {UsersService, UserView} from "@modules/users/users.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {EventsSingleModalComponent} from "@modules/events/events-single-modal/events-single-modal.component";
import {UsersSingleModalComponent} from "@modules/users/users-single-modal/users-single-modal.component";
import {UsersTicketListModalComponent} from "@modules/users/users-ticket-list-modal/users-ticket-list-modal.component";
import {UsersEditModalComponent} from "@modules/users/users-edit-modal/users-edit-modal.component";

@Component({
  selector: 'app-users-list',
  template: `
    <div class="ui grid">
      <div class="ten wide column">
        <div class="ui basic segment">
          <h2 class="page-header">Users</h2>
        </div>
      </div>
      <div class="six wide column">

        <div class="ui basic segment">
          <button class="ui large icon blue button" (click)="addUser()"><i class="icon plus"></i>Добавить пользователя
          </button>
        </div>
      </div>
    </div>

    <table class="ui inverted unstackable striped table">
      <thead>
        <tr>
          <th>card</th>
          <th>phone</th>
          <th>name</th>
          <th class="center aligned">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let u of list">
          <td>{{u.cardNumber}}</td>
          <td>+{{u.phone}}</td>
          <td>{{u.name}}</td>
          <td>
            <i class="large pencil icon link gray" (click)="editUser(u.id)" title="Редактировать"></i>
            <i class="large ticket icon link green" (click)="showTickets(u.id)"></i>
            <i class="large eye icon link" (click)="showUser(u.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <uiModalPlaceholder></uiModalPlaceholder>
    <uiMessages></uiMessages>
  `,
  styles: []
})
export class UsersListComponent implements OnInit {
  list: UserView[] = [];

  constructor(private users: UsersService,
              private modal: CustomModalService) {
  }

  ngOnInit() {
    this.users.update$.subscribe((list: UserView[]) => {
      this.list = list;
      console.log(list)
    });
    this.users.fetch();
  }

  showTickets(id: string) {
    this.modal.create(UsersTicketListModalComponent, {userId: id})
  }

  viewEvent(id: string) {
    this.modal.create(EventsSingleModalComponent, {id: id})
  }

  showUser(id: string) {
    this.modal.create(UsersSingleModalComponent, {id: id})
  }

  editUser(id: string) {
    this.modal.create(UsersEditModalComponent, {
      id: id,
      onClose: () => this.users.fetch()
    })
  }

  addUser() {
    this.modal.create(UsersEditModalComponent, {
      onClose: () => this.users.fetch()
    })
  }
}

