import {Component, Input, OnInit} from '@angular/core';
import {Modal} from "../../ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "../../ui/modules/modal/components/custom-modal/custom-modal.component";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventsService, EventView} from "../services/events.service";
import {MessagesService} from "../../ui/modules/messages/messages.service";

@Component({
  selector: 'app-events-create-modal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        Создание Event'a
      </div>
      <div modal-content>
        <form class="ui error form" [formGroup]="form" (ngSubmit)="save()">

          <!-- DateTime -->
          <div class="field">
            <div class="label">Дата проведения *</div>
            <div class="ui icon input">
              <input type="date"
                     formControlName="date"
                     tabindex="1"
                     autocomplete="off">
            </div>
            <div class="error-message" *ngIf="!date.valid && !date.pristine">
              <div *ngIf="date.errors['required']">
                Обязательное поле
              </div>
            </div>
          </div>

          <!-- Title -->
          <div class="field">
            <div class="label">Название *</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="title"
                     tabindex="1"
                     autocomplete="off">
              <i class="icon"
                 *ngIf="title.dirty || title.value.length > 0"
                 [ngClass]="{
                  'green check': title.valid,
                  'red close': title.invalid
                 }"></i>
            </div>
            <div class="error-message" *ngIf="!title.valid && !title.pristine">
              <div *ngIf="title.errors['required']">
                Обязательное поле
              </div>

            </div>
          </div>

          <!-- Price-->
          <div class="field">
            <div class="label">Цена билета *</div>
            <div class="ui icon input">
              <input type="text"
                     formControlName="price"
                     tabindex="1"
                     autocomplete="off">
              <i class="icon"
                 *ngIf="price.dirty || price.value.length > 0"
                 [ngClass]="{
                  'green check': price.valid,
                  'red close': price.invalid
                 }"></i>
            </div>
            <div class="error-message" *ngIf="!price.valid && !price.pristine">
              <div *ngIf="price.errors['required']">
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
export class EventsCreateModalComponent extends CustomModalComponent implements OnInit {

  @Input() onClose: Function;

  model: EventView = new EventView();
  form: FormGroup;

  isSubmitting: boolean = false;

  constructor(private service: EventsService,
              private messages: MessagesService) {
    super();
  }

  ngOnInit() {
    let date: string = (new Date()).toISOString().slice(0, 10);

    this.form = new FormGroup({
      'title': new FormControl(this.model.title, [
        Validators.required
      ]),
      'price': new FormControl(this.model.price, [
        Validators.required
      ]),
      'date': new FormControl(date, [
        Validators.required
      ]),
    });
  }

  get title(): AbstractControl {
    return this.form.get('title')
  }

  get price(): AbstractControl {
    return this.form.get('price')
  }

  get date(): AbstractControl {
    return this.form.get('date')
  }

  save() {
    console.log(this.form.value);
    if (this.form.invalid) return;
    this.isSubmitting = true;

    let event = new EventView(this.form.value);
    event.date = Math.trunc(((new Date(this.date.value)).getTime() / 1000));
    event.price = parseFloat(this.price.value);

    this.service.save(event)
      .then(() => {
        this.isSubmitting = false;
        this.onClose();
        this.messages.success('Event успешно сохранен');
        this.onCancel();
      })
      .catch(() => {
        this.isSubmitting = false;
        this.messages.error('Ошибка при сохранении');
      })
  }
}
