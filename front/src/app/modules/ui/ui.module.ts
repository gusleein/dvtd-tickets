import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderModule} from "@modules/ui/components/loader/loader.module";
import {PaginationModule} from "@modules/ui/components/pagination/pagination.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    PaginationModule,
    CustomModalModule,
    MessagesModule,
  ]
})
export class UiModule {
}
