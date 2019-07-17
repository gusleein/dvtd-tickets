import {Component} from "@angular/core";
import "rxjs/add/operator/do";
import {AuthService} from "../../shared/services/auth.service";
import {AuthSignInData} from "../../shared/types";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'auth-sign-in',
  template: `
    <auth-layout>
      <div form-header>Вход</div>

      <div form-body class="body">
        <auth-phone *ngIf="state=='phone'"
                    (success)="onSuccessPhone($event)"
                    [isSubmitting]="isSubmitting"
        ></auth-phone>
        <auth-password *ngIf="state=='password'"
                       (success)="onSuccessPassword($event)"
                       [isSubmitting]="isSubmitting">

        </auth-password>
      </div>
      <div form-footer class="footer">
        <div *ngIf="errorMessage">
          {{errorMessage}}
        </div>
      </div>
    </auth-layout>
  `,
  styleUrls: ['./auth-sign-in.component.less']
})
export class AuthSignInComponent {
  state = 'phone';
  authData: AuthSignInData = <AuthSignInData>{};
  isSubmitting: boolean = false;
  errorMessage = '';

  constructor(private auth: AuthService) {
  }

  onSuccessPhone(phone: string) {
    this.authData.phone = phone;
    this.state = 'password'
  }

  onSuccessPassword(password: string) {
    this.authData.password = password;
    this.isSubmitting = true;

    this.auth.signIn(this.authData)
      .then(() => {
        this.isSubmitting = false;
        this.errorMessage = '';
      })
      .catch((res: HttpErrorResponse) => {
        this.errorMessage = 'Ошибка сервера. Повторите попытку позже. ' + res.error;
        this.isSubmitting = false;
      })
  }
}
