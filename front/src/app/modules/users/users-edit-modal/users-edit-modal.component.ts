import {Component, Input, OnInit} from '@angular/core';
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {UsersService, UserView} from "@modules/users/services/users.service";
import {EventsService} from "@modules/events/services/events.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessagesService} from "@modules/ui/modules/messages/messages.service";

@Component({
  selector: 'app-users-edit-modal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        Редактирование пользователя
      </div>
      <div modal-content>
        <form class="ui error form" [formGroup]="form" (ngSubmit)="save()">

          <!-- Номер карты -->
          <div class="field">
            <div class="label">Номер карты</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="cardNumber"
                     tabindex="1"
                     autocomplete="off">
            </div>
            <div class="error-message" *ngIf="!cardNumber.valid && !cardNumber.pristine">
              <div *ngIf="cardNumber.errors['required']">
                Обязательное поле
              </div>
            </div>
          </div>

          <!-- Name -->
          <div class="field">
            <div class="label">Имя *</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="name"
                     tabindex="1"
                     autocomplete="off">
            </div>
            <div class="error-message" *ngIf="!name.valid && !name.pristine">
              <div *ngIf="name.errors['required']">
                Обязательное поле
              </div>
            </div>
          </div>

          <!-- Last Name -->
          <div class="field">
            <div class="label">Фамилия *</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="lastName"
                     tabindex="1"
                     autocomplete="off">
            </div>
            <div class="error-message" *ngIf="!lastName.valid && !lastName.pristine">
              <div *ngIf="lastName.errors['required']">
                Обязательное поле
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div class="field">
            <div class="label">Номер телефона *</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="phone"
                     tabindex="1"
                     autocomplete="off">
            </div>
            <div class="error-message" *ngIf="!phone.valid && !phone.pristine">
              <div *ngIf="phone.errors['required']">
                Обязательное поле
              </div>
            </div>
          </div>

          <button type="submit" class="ui blue right floated button"
                  [disabled]="!form.valid || isSubmitting"
                  [ngClass]="{'loading': isSubmitting}"
                  tabindex="1">
            <i class="save icon"></i>
            Сохранить
          </button>
        </form>
      </div>
      <div modal-actions>
      </div>
    </uiModal>
  `,
  styles: []
})
@Modal()
export class UsersEditModalComponent extends CustomModalComponent implements OnInit {

  @Input() id: string;
  @Input() onClose: Function;

  user: UserView;

  form: FormGroup;
  isSubmitting: boolean = false;

  constructor(private users: UsersService,
              private events: EventsService,
              private messages: MessagesService) {
    super()
  }

  ngOnInit() {
    this.user = this.users.one(this.id);

    this.form = new FormGroup({
      'cardNumber': new FormControl(this.user.cardNumber, []),
      'name': new FormControl(this.user.name, [Validators.required]),
      'lastName': new FormControl(this.user.lastName, [Validators.required]),
      'phone': new FormControl(this.user.phone, [Validators.required]),
    })
  }

  get cardNumber(): AbstractControl {
    return this.form.get('cardNumber')
  }

  get name(): AbstractControl {
    return this.form.get('name')
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName')
  }

  get phone(): AbstractControl {
    return this.form.get('phone')
  }

  save() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    this.users.save(this.user)
      .then(() => {
        this.isSubmitting = false;
        this.onClose();
        this.messages.success('Пользователь успешно сохранен');
        this.onCancel();
      })
      .catch(() => {
        this.isSubmitting = false;
        this.messages.error('Ошибка при сохранении');
      })
  }
}
