/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 14/06/2019.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'auth-password',
  template: `
    <form class="ui form" [formGroup]="form" (ngSubmit)="submit()" novalidate autocomplete="off">

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
      <div class="form-messages">
        <div *ngIf="password.touched && password.invalid" class="error-message">
          <div *ngIf="password.errors['required']">
            {{password.errors['required']}}
          </div>
        </div>
      </div>
      <button type="submit"
              class="ui primary fluid button"
              [disabled]="form.dirty && (form.pending || isSubmitting)"
              [ngClass]="{'loading': isSubmitting}">
        Отправить
      </button>
    </form>
  `,
})

export class AuthPasswordComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();
  @Input() isSubmitting: boolean;

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'password': new FormControl('', [
        this.passwordValidate
      ]),
    });
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  submit() {
    if (!this.form.valid) return;
    // get the code
    this.success.emit(this.password.value)
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
