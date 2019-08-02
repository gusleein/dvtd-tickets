import {Component, OnInit} from '@angular/core';
import {UsersService, UserView} from "@modules/users/services/users.service";

@Component({
  selector: 'app-users-list',
  template: `
    <a href="/">home</a>
    
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
              <span>{{t.partyId}}</span><br>
              <span>{{t.qrLink}}</span><br>
              <span>{{t.soldAt}}</span><br>
            </div>
          </td>
          <td>
            <i class="large pencil icon link gray" [routerLink]="['single/' + u.id]" title="Редактировать"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="large ticket icon link green" (click)="createTicket(u, 123123333)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class UsersListComponent implements OnInit {
  list: UserView[] = [];

  constructor(private users: UsersService) {
  }

  ngOnInit() {
    this.users.update$.subscribe((list: UserView[]) => {
      this.list = list;
      console.log(list)
    });
    this.users.fetch();
  }

  createTicket(u: UserView, partyId: string) {
    this.users.createTicket(u.id, partyId)
  }
}
