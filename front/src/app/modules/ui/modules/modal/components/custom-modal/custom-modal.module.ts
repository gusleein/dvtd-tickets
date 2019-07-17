import {NgModule} from "@angular/core";

import {CustomModalService} from "../../shared/services/custom-modal.service";
import {ModalPlaceholderComponent} from "./modal-placeholder.component";

@NgModule({
  declarations: [
    ModalPlaceholderComponent
  ],
  exports: [
    ModalPlaceholderComponent
  ],
  providers: [
    CustomModalService
  ]
})
export class CustomModalModule {
}
