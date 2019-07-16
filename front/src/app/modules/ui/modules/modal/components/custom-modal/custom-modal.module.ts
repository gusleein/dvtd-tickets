import {NgModule} from "@angular/core";

import {ModalPlaceholderComponent} from "../modal-placeholder/modal-placeholder.component";
import {ModalService} from "../../shared/services/modal.service";

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
