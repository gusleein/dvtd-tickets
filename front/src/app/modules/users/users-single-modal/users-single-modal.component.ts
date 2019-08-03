import {Component, Input, OnInit} from '@angular/core';
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {UsersService, UserView} from "@modules/users/services/users.service";

@Component({
  selector: 'app-users-single-modal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        Карточка Пользователя
      </div>
      <div modal-content>
        <div class="ui basic segment">
          <div class="header">Номер карты:</div>
          <div class="content">{{model.cardNumber}}</div>
        </div>
        <div class="ui basic segment">
          <div class="header">Имя:</div>
          <div class="content">{{model.name}} {{model.lastName}}</div>
        </div>
        <div class="ui basic segment">
          <div class="header">Номер телефона:</div>
          <div class="content">+{{model.phone}}</div>
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
export class UsersSingleModalComponent extends CustomModalComponent implements OnInit {

  @Input() id: string;
  model: UserView = new UserView();

  constructor(private service: UsersService) {
    super();
  }

  ngOnInit() {
    this.model = this.service.one(this.id);
  }

}
