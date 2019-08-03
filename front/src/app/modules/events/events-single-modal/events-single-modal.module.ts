import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../../ui/modules/modal/modal.module";
import {EventsSingleModalComponent} from "./events-single-modal.component";
import {EventsService} from "@modules/events/services/events.service";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    EventsSingleModalComponent

  ],
  entryComponents: [
    EventsSingleModalComponent
  ],
  providers: [
    EventsService
  ]
})
export class EventsSingleModalModule {
}
