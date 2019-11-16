import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersSingleModalComponent} from './users-single-modal.component';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {UsersService} from "@modules/users/users.service";
import {EventsService} from "@modules/events/services/events.service";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    UsersSingleModalComponent
  ],
  entryComponents: [
    UsersSingleModalComponent
  ],
  providers: [
    UsersService,
    EventsService
  ]
})
export class UsersSingleModalModule {
}
