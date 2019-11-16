import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersService} from "@modules/users/users.service";
import {HttpClientModule} from "@angular/common/http";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";
import {EventsSingleModalModule} from "@modules/events/events-single-modal/events-single-modal.module";
import {UsersSingleModalModule} from "@modules/users/users-single-modal/users-single-modal.module";
import {UsersTicketListModalModule} from "@modules/users/users-ticket-list-modal/users-ticket-list-modal.module";
import {UsersEditModalModule} from "@modules/users/users-edit-modal/users-edit-modal.module";

@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    EventsSingleModalModule,
    UsersSingleModalModule,
    UsersEditModalModule,
    UsersTicketListModalModule,
    CustomModalModule,
    MessagesModule,
  ],
  providers: [
    UsersService,
  ]
})
export class UsersModule {
}
