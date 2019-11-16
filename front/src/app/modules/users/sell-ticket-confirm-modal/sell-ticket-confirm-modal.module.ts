import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellTicketConfirmModalComponent} from './sell-ticket-confirm-modal.component';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {FormsModule} from "@angular/forms";
import {EventsService} from "@modules/events/services/events.service";
import {UsersService} from "@modules/users/users.service";

@NgModule({
  declarations: [SellTicketConfirmModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
  ],
  entryComponents: [
    SellTicketConfirmModalComponent
  ],
  providers: [
    EventsService,
    UsersService
  ]
})
export class SellTicketConfirmModalModule {
}
