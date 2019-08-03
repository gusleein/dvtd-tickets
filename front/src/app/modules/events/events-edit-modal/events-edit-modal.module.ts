import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../../ui/modules/modal/modal.module";
import {EventsEditModalComponent} from "./events-edit-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EventsService} from "@modules/events/services/events.service";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EventsEditModalComponent

  ],
  entryComponents: [
    EventsEditModalComponent
  ],
  providers: [
    EventsService
  ]
})
export class EventsEditModalModule {
}
