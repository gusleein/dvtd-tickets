import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersSingleComponent} from './users-single/users-single.component';
import {UsersService} from "@modules/users/services/users.service";
import {HttpClientModule} from "@angular/common/http";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";
import {EventsSingleModalModule} from "@modules/events/events-single-modal/events-single-modal.module";

@NgModule({
  declarations: [
    UsersListComponent,
    UsersSingleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    EventsSingleModalModule,

    CustomModalModule,
    MessagesModule,
  ],
  providers: [
    UsersService,
  ]
})
export class UsersModule {
}
