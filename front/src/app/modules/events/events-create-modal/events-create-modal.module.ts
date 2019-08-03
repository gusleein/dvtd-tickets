import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../../ui/modules/modal/modal.module";
import {EventsCreateModalComponent} from "./events-create-modal.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
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
