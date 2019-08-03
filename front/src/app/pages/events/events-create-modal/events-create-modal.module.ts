import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {EventsCreateModalComponent} from "./events-create-modal.component";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    EventsCreateModalComponent

  ],
  entryComponents: [
    EventsCreateModalComponent
  ]
})
export class EventsCreateModalModule {
}
