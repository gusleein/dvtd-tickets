import {Component, Input} from "@angular/core";
import {Modal} from "./custom-modal.module";
import {CustomModalComponent} from "./custom-modal.component";

@Component({
  selector: 'app-modal, ui-modal',
  template: `
    <div class="ui dimmer modals transition visible active ui-modal">
      <div class="ui modal">
        <ng-content select="[modal-icon]"></ng-content>
        <div class="header">
          <ng-content select="[modal-header]"></ng-content>
        </div>
        <div class="content">
          <div class="dimmable">
            <div class="ui active inverted dimmer" *ngIf="isLoading">
              <div class="ui loader"></div>
            </div>
            <ng-content select="[modal-content]"></ng-content>
          </div>
        </div>
        <div class="actions">
          <ng-content select="[modal-actions]"></ng-content>
        </div>
        <div class="progress">
          <ng-content select="[modal-progress]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.less'],
  exportAs: 'modal',
})
@Modal()
export class ModalComponent extends CustomModalComponent {
  @Input() isLoading = false;

  constructor() {
    super()
  }

}
