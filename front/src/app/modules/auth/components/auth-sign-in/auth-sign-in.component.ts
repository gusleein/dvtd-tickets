import {Component} from "@angular/core";
import "rxjs/add/operator/do";

@Component({
  selector: 'auth-sign-in',
  template: `
    <auth-phone (success)="onSuccess()"></auth-phone>
  `,
  styleUrls: ['./auth-sign-in.component.less']
})
export class AuthSignInComponent {
  onSuccess() {
    console.log('success')
  }
}
