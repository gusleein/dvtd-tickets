import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersCreateTicketModalComponent} from './users-create-ticket-modal.component';
import {EventsService} from "@modules/events/services/events.service";
import {UsersService} from "@modules/users/services/users.service";
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {FormsModule} from "@angular/forms";
import {UsersCreateTicketTableRowComponent} from './users-create-ticket-table-row/users-create-ticket-table-row.component';
import {SellTicketConfirmModalModule} from "@modules/users/sell-ticket-confirm-modal/sell-ticket-confirm-modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";

@NgModule({
  declarations: [
    UsersCreateTicketModalComponent,
    UsersCreateTicketTableRowComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    MessagesModule,
    FormsModule,
    SellTicketConfirmModalModule,
  ],
  entryComponents: [
    UsersCreateTicketModalComponent
  ],
  providers: [
    EventsService,
    UsersService
  ]
})
export class UsersCreateTicketModalModule {
}
