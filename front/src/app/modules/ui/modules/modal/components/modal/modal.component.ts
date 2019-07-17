import {Component, Input} from "@angular/core";
import {CustomModalComponent} from "../custom-modal/custom-modal.component";
import {Modal} from "../custom-modal/custom-modal.container";

@Component({
  selector: 'ui-modal, uiModal',
  template: `
    <div class="ui dimmer modals transition visible active ui-modal">
      <div class="ui modal">
        <ng-content select="[modal-icon]" (click)="onCancel()"></ng-content>
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
  exportAs: 'uiModal',
})
@Modal()
export class ModalComponent extends CustomModalComponent {
  @Input() isLoading = false;
}
