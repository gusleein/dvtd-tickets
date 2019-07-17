import {Component, OnInit} from "@angular/core";

import {Alert} from "../models/messages.model";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-messages, uiMessages',
  template: `
    <div class="messages" *ngIf="alerts.length">
      <div *ngFor="let alert of alerts" class="alert-dismissable message">
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
        <i class="close small icon" (click)="clearAlert(alert.index)"></i>
      </div>
      <div class="clear all" (click)="clearAllAlerts()"><i class="close small icon"></i>&nbsp;&nbsp;clear all</div>
    </div>
  `,
  exportAs: 'uiMessages',
  styleUrls: ['./messages.component.less']
})

export class MessagesComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: MessagesService) {
  }

  ngOnInit() {

    this.alertService.clearAlert().subscribe((index) => {
      this.clearAlert(index)
    });

    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.clearAllAlerts();
        return;
      }
      this.alerts.push(alert);
    });
  }

  clearAllAlerts() {
    this.alerts = [];
  }

  clearAlert(index) {
    let a = this.alerts.find((a: Alert) => a.index == index);
    let i = this.alerts.indexOf(a);
    this.alerts.splice(i, 1);
  }
}
