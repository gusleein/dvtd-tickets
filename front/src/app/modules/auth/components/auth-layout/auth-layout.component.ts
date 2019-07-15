/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 2/9/18.
 */
import {Component} from "@angular/core";

@Component({
  selector: 'auth-layout',
  template: `
    <div class="wrapper ui-wrapper-mobile">
      <div class="auth">
        <div class="ui equal width vertically padded grid">
          <div class="row">
            <div class="auth-form">
              <auth-header>
                <ng-content select="[form-header]"></ng-content>
              </auth-header>
              <ng-content select="[form-body]"></ng-content>
              <ng-content select="[form-footer]"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./auth-layout.component.less']
})
export class AuthLayoutComponent {
}
