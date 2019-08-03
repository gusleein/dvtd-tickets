import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'auth', loadChildren: "./modules/auth/auth.module#AuthModule"},
  {path: 'users', loadChildren: "./pages/users/users.module#UsersModule"},
  {path: 'events', loadChildren: "./pages/events/events.module#EventsModule"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
