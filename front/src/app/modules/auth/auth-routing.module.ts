import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthSignInComponent} from "./components/auth-sign-in/auth-sign-in.component";

const routes: Routes = [
  // Auth Module
  {path: 'signIn', component: AuthSignInComponent},
  {path: '', redirectTo: 'signIn', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
