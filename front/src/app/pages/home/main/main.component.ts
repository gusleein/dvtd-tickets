import {Component, OnInit} from '@angular/core';
import {CustomModalService} from "@modules/ui/modules/modal/shared/services/custom-modal.service";
import {HomeModalComponent} from "../home-modal/home-modal.component";
import {MessagesService} from "@modules/ui/modules/messages/messages.service";

@Component({
  selector: 'app-main',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
      <img width="300"
           src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a rel="noopener" [routerLink]="['auth']">Auth</a></h2>
      </li>
      <li>
        <h2><a (click)="openModal()">Modal</a></h2>
      </li>
      <li>
        Messages
        <ul>
          <li>
            <h2><a (click)="successMessage()">Success</a></h2>
          </li>
          <li>
            <h2><a (click)="errorMessage()">Error</a></h2>
          </li>
        </ul>
      </li>
    </ul>
    <uiModalPlaceholder></uiModalPlaceholder>
    <uiMessages></uiMessages>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  title = 'front';

  constructor(private modal: CustomModalService,
              private messages: MessagesService) {
  }

  ngOnInit() {
  }

  openModal() {
    this.modal.create(HomeModalComponent, {})
  }

  successMessage() {
    this.messages.success("hello!")
  }

  errorMessage() {
    this.messages.error("hello!")
  }
}
