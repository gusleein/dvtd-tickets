import {Component, OnInit} from '@angular/core';
import {UsersService, UserView} from "@modules/users/services/users.service";
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {EventsSingleModalComponent} from "@modules/events/events-single-modal/events-single-modal.component";
import {UsersSingleModalComponent} from "@modules/users/users-single-modal/users-single-modal.component";

@Component({
  selector: 'app-users-list',
  template: `
    <div class="ui basic segment">
      <h2 class="page-header">Users</h2>
    </div>

    <table class="ui inverted unstackable striped table">
      <thead>
        <tr>
          <th>id</th>
          <th class="cell center aligned">phone</th>
          <th class="cell center aligned">name</th>
          <th>last name</th>
          <th>card</th>
          <th class="center aligned">tickets</th>
          <th class="center aligned">actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let u of list">
          <td>{{u.id}}</td>
          <td>+{{u.phone}}</td>
          <td>{{u.name}}</td>
          <td>{{u.lastName}}</td>
          <td>{{u.cardNumber}}</td>
          <td>
            <div *ngFor="let t of u.tickets">
              <span>{{t.uid}}</span><br>
              <a (click)="viewEvent(t.eventId)">{{t.eventId}}</a><br>
              <a target="_blank" [href]="t.qrLink">{{t.qrLink}}</a><br>
              <span>{{t.soldAt}}</span><br>
              <span>{{t.price}}</span><br>
            </div>
          </td>
          <td>
            <i class="large pencil icon link gray" [routerLink]="['single/' + u.id]" title="Редактировать"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="large ticket icon link green" (click)="createTicket(u, '5d44e7243f096b506d5016de')"></i>
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

  createTicket(u: UserView, eventId: string) {
    this.users.createTicket(u.id, eventId)
  }

  viewEvent(id: string) {
    this.modal.create(EventsSingleModalComponent, {id: id})
  }

  viewUser(id: string) {
    this.modal.create(UsersSingleModalComponent, {id: id})
  }
}
