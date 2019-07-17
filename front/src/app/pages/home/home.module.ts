import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
import {HomeModalModule} from "./home-modal/home-modal.module";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";
import {MessagesModule} from "@modules/ui/modules/messages/messages.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeModalModule,
    CustomModalModule,
    MessagesModule,
  ]
})
export class HomeModule {
}
