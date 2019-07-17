/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 14/06/2019.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'auth-phone',
  template: `
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
      <div class="form-messages">
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

export class AuthPhoneComponent implements OnInit {

  @Output() success: EventEmitter<string> = new EventEmitter();
  @Input() isSubmitting: boolean;

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'phone': new FormControl('+7', [
        this.phoneValidate
      ]),
    });
  }

  get phone(): AbstractControl {
    return this.form.get('phone');
  }

  submit() {
    if (!this.form.valid) return;
    // get the code
    this.success.emit(this.phone.value);
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
}
