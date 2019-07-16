import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {ModalComponent} from "./modal.component";
import {ModalService} from "@modules/ui/modules/modal/shared/services/modal.service";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {ModalPlaceholderComponent} from "@modules/ui/modules/modal/components/modal-placeholder/modal-placeholder.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    ModalComponent,
    CustomModalComponent,
    ModalPlaceholderComponent,
  ],
  exports: [ModalComponent],
  providers: [ModalService]
})
export class ModalModule {
}
