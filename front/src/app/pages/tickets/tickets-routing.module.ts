import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketsComponent} from "./tickets.component";

const routes: Routes = [
  {path: 'sell', component: TicketsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'sell'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {
}
