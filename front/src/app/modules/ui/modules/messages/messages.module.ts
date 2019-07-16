import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {MessagesComponent} from "./components/messages.component";

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
  providers: [],
})
export class MessagesModule {
}
