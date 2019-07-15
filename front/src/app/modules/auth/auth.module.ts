import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CoreModule} from "@modules/core/core.module";

import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthSignInComponent} from "./components/auth-sign-in/auth-sign-in.component";
import {AuthHeaderComponent} from "./components/auth-header/auth-header.component";
import {AuthPhoneComponent} from "./components/auth-phone/auth-phone.component";
import {AuthPhoneConfirmComponent} from "./components/auth-phone-confirm/auth-phone-confirm.component";
import {AuthService} from "@modules/auth/shared/services/auth.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,

    AuthRoutingModule
  ],
  declarations: [
    // layouts
    AuthLayoutComponent,
    AuthHeaderComponent,
    // views
    AuthSignInComponent,
    AuthPhoneComponent,
    AuthPhoneConfirmComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {
}
