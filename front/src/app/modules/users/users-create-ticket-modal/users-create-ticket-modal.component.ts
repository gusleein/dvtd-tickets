import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {UsersService, UserView} from "@modules/users/users.service";
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
        <div class="ui grid">
          <div class="nine wide column">
            <h3 class="header">{{event.dateToString()}} &nbsp;&nbsp;/&nbsp;&nbsp; {{event.title}}</h3>
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
        </div>
        <table class="ui inverted selectable unstackable striped fixed table">
          <thead>
            <tr>
              <th class="cell num">#</th>
              <th (click)="sortBy('cardNumber')">
                <i class="icon sort link" [ngClass]="sortDirectionIcon('cardNumber')"></i>
                card number
              </th>
              <th (click)="sortBy('lastName')">
                <i class="icon sort link" [ngClass]="sortDirectionIcon('lastName')"></i>
                name
              </th>
              <th (click)="sortBy('phone')">
                <i class="icon sort link" [ngClass]="sortDirectionIcon('phone')"></i>
                phone
              </th>
              <th class="center aligned">actions</th>
            </tr>
          </thead>
          <tbody users-filter-table [list]="listToShow" [eventId]="event.id" (close)="onCancel()"></tbody>
        </table>
      </div>
      <div modal-actions>
        <div class="ui inverted segment">
          <button class="ui button icon red" (click)="onCancel()"><i class="icon arrow left"></i>Назад</button>
        </div>
      </div>
    </uiModal>
  `,
  styles: [`
    .ui.form .ui.input.icon input {
      padding: 1rem;
      border-radius: 3px;
    }

    .ui.form .ui.input.icon .icon.search {
      right: 1rem;
    }

    .cell.num {
      width: 2rem;
    }
  `]
})
@Modal()
export class UsersCreateTicketModalComponent extends CustomModalComponent implements OnInit {

  @Input() eventId: string;

  fullList: UserView[];
  listToShow: UserView[];

  event: EventView;

  query: string = '';

  columnToSort: string = 'cardNumber';
  sortReverse: boolean = false;

  constructor(private usersService: UsersService,
              private eventsService: EventsService) {
    super();
  }

  ngOnInit() {
    this.usersService.update$.subscribe(() => {
      this.fullList = this.usersService.all();
      this.sortFullList();
      this.filter();
    });
    this.usersService.fetch();

    this.event = this.eventsService.one(this.eventId);
    this.fullList = this.usersService.all();
    this.sortFullList();
    this.listToShow = this.fullList;
  }

  onChangeSearch() {
    if (this.query.length > 0) {
      this.filter();
      return;
    }
    this.listToShow = this.fullList;
  }

  filter() {
    this.listToShow = _.filter(this.fullList, (u: UserView) =>
      u.cardNumber.includes(this.query) ||
      u.name.includes(this.query) ||
      u.phone.includes(this.query)
    );
  }

  // сортирует исходный список
  sortFullList() {
    this.fullList = _.sortBy(this.fullList, this.columnToSort);
    if (this.sortReverse) this.fullList.reverse();
  }

  sortBy(by: string) {
    // если этот же столбик, то меняем направление сортировки
    this.sortReverse = !this.sortReverse;

    // если выбран другой столбик, то уст. направление сортировки по-умолчанию
    if (by !== this.columnToSort) this.sortReverse = false;

    this.columnToSort = by;
    this.sortFullList();
  }

  sortDirectionIcon(byColumn: string): string {
    if (byColumn == this.columnToSort) {
      if (this.sortReverse) return 'down';
      return 'up';
    }
    return '';
  }
}
