import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'auth', loadChildren: "./modules/auth/auth.module#AuthModule"},
  {path: '', loadChildren: "./pages/home/home.module#HomeModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
