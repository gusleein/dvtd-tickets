import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
import {HomeModalModule} from "./home-modal/home-modal.module";
import {CustomModalModule} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeModalModule,
    CustomModalModule
  ]
})
export class HomeModule {
}
