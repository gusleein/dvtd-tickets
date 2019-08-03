import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsListComponent} from "./events-list/events-list.component";

const routes: Routes = [
  {path: "list", component: EventsListComponent},
  {path: "", pathMatch: "full", redirectTo: 'list'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
