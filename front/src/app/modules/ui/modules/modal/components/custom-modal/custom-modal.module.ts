import {NgModule} from "@angular/core";

import {ModalService} from "../../shared/services/modal.service";
import {ModalPlaceholderComponent} from "./modal-placeholder.component";

@NgModule({
  declarations: [
    ModalPlaceholderComponent
  ],
  exports: [
    ModalPlaceholderComponent
  ],
  providers: [
    ModalService
  ]
})
export class CustomModalModule {
}
