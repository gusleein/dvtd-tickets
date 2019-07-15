import {Component, OnInit} from "@angular/core";

import {Alert} from "../models/messages.model";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages',
  template: `
    <div *ngFor="let alert of alerts" class="alert-dismissable messages">
      <div class="icon">
        <i class="ui icon big" [ngClass]="{
      'green check circle': alert.type == 1,
      'red exclamation triangle': alert.type == 2,
      'blue info': alert.type == 3
    }"></i>
      </div>
      <div class="content">
        <p class="title">
          {{alert.title}}
        </p>
        <p class="description">
          {{alert.message}}
        </p>
      </div>
    </div>`,
  styleUrls: ['./messages.component.less']
})

export class MessagesComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: MessagesService) {
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);
    });
  }
}
