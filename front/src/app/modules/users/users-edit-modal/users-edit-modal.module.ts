import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersEditModalComponent} from './users-edit-modal.component';
import {ModalModule} from "@modules/ui/modules/modal/modal.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "@modules/users/services/users.service";

@NgModule({
  declarations: [UsersEditModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UsersEditModalComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersEditModalModule {
}
