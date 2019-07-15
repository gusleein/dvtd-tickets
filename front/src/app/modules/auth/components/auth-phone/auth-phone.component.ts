/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 14/06/2019.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'auth-phone',
  template: `
    <auth-layout>
      <div form-header>Вход</div>

      <div form-body class="body">
        <form class="ui form" [formGroup]="form" (ngSubmit)="submit()" novalidate autocomplete="off">

          <!-- Phone -->
          <div class="field">
            <div class="label">Номер телефона</div>
            <div class="ui icon input">
              <input type="text"
                     name="username"
                     formControlName="phone">
              <i *ngIf="phone.dirty"
                 [ngClass]="{
                  'icon green check': phone.valid,
                  'icon red close': !phone.valid
                 }"></i>
            </div>
          </div>

          <!-- Password -->
          <div class="field">
            <div class="label">Пароль</div>
            <div class="ui icon input">
              <input type="password"
                     name="password"
                     formControlName="password">
              <i *ngIf="password.dirty"
                 [ngClass]="{
                  'icon green check': password.valid,
                  'icon red close': !password.valid
                 }"></i>
            </div>
          </div>

          <button type="submit"
                  class="ui primary fluid button"
                  [disabled]="form.dirty && (form.pending || isSubmitting)"
                  [ngClass]="{'loading': isSubmitting}">
            Отправить код
          </button>
        </form>

      </div>
      <div form-footer class="footer">
        <div class="form-messages">
          <div *ngIf="password.touched && password.invalid" class="error-message">
            <div *ngIf="password.errors['required']">
              {{password.errors['required']}}
            </div>
          </div>
          <div *ngIf="phone.touched && phone.invalid" class="error-message">
            <div *ngIf="phone.errors['required']">
              {{phone.errors['required']}}
            </div>
            <div *ngIf="phone.errors['incorrect'] && !phone.errors['required']">
              {{phone.errors['incorrect']}}
            </div>
            <div *ngIf="phone.errors['length'] && !phone.errors['required'] && !phone.errors['incorrect']">
              {{phone.errors['length']}}
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

export class AuthPhoneComponent implements OnInit {

  @Output() success: EventEmitter<void> = new EventEmitter();

  form: FormGroup;

  isSubmitting = false;
  errorMessage: string = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'phone': new FormControl('+7', [
        this.phoneValidate
      ]),
      'password': new FormControl('', [
        this.passwordValidate
      ]),
    });
  }

  get phone(): AbstractControl {
    return this.form.get('phone');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  submit() {
    if (!this.form.valid) return;
    // clear errors
    this.errorMessage = '';

    this.isSubmitting = true;
    // get the code
    this.auth.signIn({
      phone: this.phone.value,
      password: this.password.value
    })
      .then(() => {
        this.isSubmitting = false;
        this.success.emit();
      })
      .catch((res: HttpErrorResponse) => {
        this.errorMessage = 'Ошибка сервера. Повторите попытку позже. ' + res.error;
        this.isSubmitting = false;
      })
  }

  phoneValidate(control: AbstractControl): ValidationErrors | null {
    let errors: ValidationErrors = {};

    if (control.value.length < 12) errors['length'] = 'Введите номер полностью';
    if (control.value.length > 12) errors['length'] = 'Вы ввели что-то лишнее';
    if (control.value.length >= 0 && control.value.length <= 2) errors['required'] = 'Введите номер телефона';

    if (!/^[0-9+()\- ]+$/.test(control.value) || control.value[0] !== '+') errors['incorrect'] = 'Номер телефона должен быть в формате +79991230000';

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }

  passwordValidate(control: AbstractControl): ValidationErrors | null {
    let errors: ValidationErrors = {};

    if (control.value.length === 0) errors['required'] = 'Введите пароль';

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
}
