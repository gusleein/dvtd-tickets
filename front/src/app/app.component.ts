import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <div class="ui grid">
      <div class="two wide column">
        <ul>
          <li>
            <h2><a rel="noopener" [routerLink]="['auth']">Auth</a></h2>
          </li>
          <li>
            <h2><a rel="noopener" [routerLink]="['users']">Users</a></h2>
          </li>
          <li>
            <h2><a rel="noopener" [routerLink]="['events']">Events</a></h2>
          </li>
        </ul>
      </div>
      <div class="fourteen wide column">
        <router-outlet></router-outlet>
      </div>
    </div>`,
})
export class AppComponent {
}
