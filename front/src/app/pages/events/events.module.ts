import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsListComponent} from './events-list/events-list.component';
import {EventsService} from "@modules/events/services/events.service";
import {HttpClientModule} from "@angular/common/http";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";
import {EventsCreateModalModule} from "./events-create-modal/events-create-modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    EventsCreateModalModule,
    CustomModalModule,
    EventsRoutingModule,
    MessagesModule,
  ],
  declarations: [
    EventsListComponent,
  ],
  providers: [
    EventsService
  ],
})
export class EventsModule {
}
