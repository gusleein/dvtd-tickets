import {Component} from "@angular/core";
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";

@Component({
  selector: 'app-home-modal, homeModal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
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
}
