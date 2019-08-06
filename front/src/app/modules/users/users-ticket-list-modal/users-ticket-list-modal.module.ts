import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersTicketListModalComponent} from './users-ticket-list-modal.component';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {UsersService} from "@modules/users/services/users.service";

@NgModule({
  declarations: [UsersTicketListModalComponent],
  imports: [
    CommonModule,
    ModalModule,

  ],
  entryComponents: [
    UsersTicketListModalComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersTicketListModalModule {
}
