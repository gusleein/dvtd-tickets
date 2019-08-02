import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersSingleComponent } from './users-single/users-single.component';
import {UsersService} from "@modules/users/services/users.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    UsersListComponent,
    UsersSingleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
