import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderModule} from "@modules/ui/components/loader/loader.module";
import {PaginationModule} from "@modules/ui/components/pagination/pagination.module";
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    PaginationModule,
    ModalModule,
    MessagesModule,
  ],
})
export class UiModule {
}
