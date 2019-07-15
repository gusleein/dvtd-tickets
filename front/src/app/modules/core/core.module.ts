import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoaderComponent} from "./components/loader/loader.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
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
