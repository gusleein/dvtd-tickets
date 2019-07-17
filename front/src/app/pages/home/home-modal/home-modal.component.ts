import {Component, Input} from "@angular/core";
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";

@Component({
  selector: 'app-home-modal, homeModal',
  template: `
    <uiModal *ngIf="open">
      <i modal-icon class="times circle icon" (click)="close()"></i>
      <div modal-header>
        header
      </div>
      <div modal-content>text</div>
      <div modal-actions>
        <button>Ok</button>
      </div>
    </uiModal>
  `,
})
@Modal()
export class HomeModalComponent extends CustomModalComponent {
  @Input() open: boolean = false;

  close() {
    this.open = false
  }
}
