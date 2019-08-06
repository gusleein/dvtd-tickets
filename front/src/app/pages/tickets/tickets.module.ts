import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketsRoutingModule} from './tickets-routing.module';
import {TicketsComponent} from './tickets.component';
import {UsersService} from "@modules/users/services/users.service";
import {EventsService} from "@modules/events/services/events.service";
import {HttpClientModule} from "@angular/common/http";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";
import {UsersTicketModalModule} from "@modules/users/users-ticket-modal/users-ticket-modal.module";
import {UsersSingleModalModule} from "@modules/users/users-single-modal/users-single-modal.module";
import {UsersCreateTicketModalModule} from "@modules/users/users-create-ticket-modal/users-create-ticket-modal.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MessagesModule,
    FormsModule,

    UsersTicketModalModule,
    UsersSingleModalModule,
    UsersCreateTicketModalModule,

    CustomModalModule,
    TicketsRoutingModule,
  ],
  providers: [
    EventsService,
    UsersService
  ]
})
export class TicketsModule {
}
