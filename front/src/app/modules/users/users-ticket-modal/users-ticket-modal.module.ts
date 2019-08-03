import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersTicketModalComponent} from './users-ticket-modal.component';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {UsersService} from "@modules/users/services/users.service";
import {EventsService} from "@modules/events/services/events.service";

@NgModule({
  declarations: [
    UsersTicketModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
  ],
  entryComponents: [
    UsersTicketModalComponent
  ],
  providers: [
    UsersService,
    EventsService,
  ]
})
export class UsersTicketModalModule {
}
