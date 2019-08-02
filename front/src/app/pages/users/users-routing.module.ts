import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {UsersSingleComponent} from "./users-single/users-single.component";

const routes: Routes = [
  {path: 'list', component: UsersListComponent},
  {path: 'single/:id', component: UsersSingleComponent},
  {path: '', pathMatch: 'full', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
