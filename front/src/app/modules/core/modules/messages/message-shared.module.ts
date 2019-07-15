import {ModuleWithProviders, NgModule} from "@angular/core";
import {MessagesService} from "./messages.service";

@NgModule({})
export class MessagesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessagesSharedModule,
      providers: [MessagesService]
    };
  }
}
