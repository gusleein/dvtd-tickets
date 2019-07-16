import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LocalStorageService} from "./shared/services/local-storage.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
  ],
  providers: [
    LocalStorageService
  ]
})
export class CoreModule {
}
