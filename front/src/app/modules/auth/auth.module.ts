import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {CoreModule} from "@modules/core/core.module";
import {HttpClientModule} from "@angular/common/http";

import {AuthRoutingModule} from "./auth-routing.module";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {AuthSignInComponent} from "./components/auth-sign-in/auth-sign-in.component";
import {AuthHeaderComponent} from "./components/auth-header/auth-header.component";
import {AuthPhoneComponent} from "./components/auth-phone/auth-phone.component";
import {AuthPhoneConfirmComponent} from "./components/auth-phone-confirm/auth-phone-confirm.component";
import {AuthPasswordComponent} from "./components/auth-password/auth-password.component";
import {AuthService} from "./shared/services/auth.service";

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
    AuthPasswordComponent,
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {
}
