import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeModalComponent} from "./home-modal.component";
import {ModalModule} from "@modules/ui/modules/modal/modal.module";

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
  ],
  declarations: [
    HomeModalComponent
  ],
  entryComponents: [
    HomeModalComponent
  ],
})
export class HomeModalModule {
}
