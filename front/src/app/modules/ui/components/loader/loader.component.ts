import {Component, Input} from "@angular/core";

@Component({
  selector: 'loader, pre-loader, [loading...]',
  template: `
    <div class="ui active inverted dimmer" *ngIf="isLoading">
      <div class="ui loader"></div>
    </div>
  `,
})
export class LoaderComponent {
  @Input('isLoading') isLoading: boolean = false;

  constructor() {
  }
}
