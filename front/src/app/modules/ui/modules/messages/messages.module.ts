import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MessagesComponent} from "./components/messages.component";
import {MessagesService} from "@modules/ui/modules/messages/messages.service";

const UI_COMPONENTS = [
  MessagesComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: UI_COMPONENTS,
  exports: UI_COMPONENTS,
  providers: [MessagesService],
})
export class MessagesModule {
}
