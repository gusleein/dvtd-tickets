import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "../ui/components/loader/loader.component";
import {PaginationComponent} from "../ui/components/pagination/pagination.component";
import {LocalStorageService} from "./shared/services/local-storage.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    PaginationComponent,
  ],
  exports: [
    LoaderComponent,
    PaginationComponent,
  ],
  providers: [
    LocalStorageService
  ]
})
export class CoreModule {
}
