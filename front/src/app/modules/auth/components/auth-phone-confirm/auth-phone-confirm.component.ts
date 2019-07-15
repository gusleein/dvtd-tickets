/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 14/06/2019.
 */
import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'auth-phone-confirm',
  template: `
    <auth-layout>
      <div form-header>Код подтверждения</div>

      <div form-body class="body">
        <form class="ui form" [formGroup]="form" (ngSubmit)="submit()" novalidate autocomplete="off">

          <!-- Code -->
          <div class="field">
            <div class="label">Код</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="code"
                     autocomplete="off">
            </div>
          </div>

          <button type="submit"
                  class="ui primary fluid button"
                  [disabled]="form.dirty && (form.pending || isSubmitting)"
                  [ngClass]="{'loading': isSubmitting}">
            Войти
          </button>
        </form>

      </div>
      <div form-footer class="footer">
        <div class="form-messages">
          <div *ngIf="code.touched && code.invalid" class="error-message">
            <div *ngIf="code.errors['required']">
              {{code.errors['required']}}
            </div>
          </div>
          <div *ngIf="errorMessage">
            {{errorMessage}}
          </div>
        </div>
      </div>

    </auth-layout>
  `,
})

export class AuthPhoneConfirmComponent implements OnInit {
  @Input() phone: string = '';

  form: FormGroup;

  isSubmitting = false;
  errorMessage: string = '';

  constructor(private auth: AuthService,
              private router: Router,) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'code': new FormControl('', [
        this.codeValidate
      ])
    });
  }

  get code(): AbstractControl {
    return this.form.get('code');
  }

  submit() {
    if (!this.form.valid) return;

    // clear errors
    this.errorMessage = '';
    //
    this.auth.clearStorage();
    this.isSubmitting = true;

    this.auth.confirm({
      phone: this.phone,
      code: this.code.value
    })
      .then((u: User) => {
        this.auth.setToken(u.token);
        localStorage.setItem('currentUser', JSON.stringify(u));
        // редирект на главную страницу
        this.router.navigate(['/']);
        this.isSubmitting = false;
      })
      .catch((res: HttpErrorResponse) => {
        this.errorMessage = 'Неверный код';
        this.isSubmitting = false;
      })
  }

  codeValidate(control: AbstractControl): ValidationErrors | null {
    let errors: ValidationErrors = {};

    if (control.value.length === 0) errors['required'] = 'Пожалуйста введите код';

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
}
