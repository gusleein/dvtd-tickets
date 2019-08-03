import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsListComponent} from './events-list/events-list.component';
import {EventsService} from "@modules/events/services/events.service";

@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  providers: [
    EventsService
  ]
})
export class EventsModule {
}
