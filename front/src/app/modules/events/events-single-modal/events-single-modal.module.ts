import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from "../../ui/modules/modal/modal.module";
import {EventsSingleModalComponent} from "./events-single-modal.component";

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
  ]
})
export class EventsSingleModalModule {
}
