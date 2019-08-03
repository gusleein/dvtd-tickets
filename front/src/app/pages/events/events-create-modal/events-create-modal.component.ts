import {Component, OnInit} from '@angular/core';
import {Modal} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.container";
import {CustomModalComponent} from "@modules/ui/modules/modal/components/custom-modal/custom-modal.component";

@Component({
  selector: 'app-events-create-modal',
  template: `
    <uiModal>
      <i modal-icon class="times circle icon" (click)="onCancel()"></i>
      <div modal-header>
        Создание Event'a
      </div>
      <div modal-content>
        форма!!
      </div>
      <div modal-actions>
        <button>Ok</button>
      </div>
    </uiModal>
  `,
  styles: []
})
@Modal()
export class EventsCreateModalComponent extends CustomModalComponent implements OnInit {

  ngOnInit() {

  }
}
