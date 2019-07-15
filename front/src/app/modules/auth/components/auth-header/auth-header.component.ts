/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 2/9/18.
 */
import {Component} from "@angular/core";

@Component({
  selector: 'auth-header',
  template: `
    <div class="header">
      <div class="text">
        <ng-content></ng-content>
      </div>
    </div>`
})
export class AuthHeaderComponent {
}
