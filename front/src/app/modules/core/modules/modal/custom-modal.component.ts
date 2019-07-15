import {HostListener} from "@angular/core";

export class CustomModalComponent {

  @HostListener('window:keyup', ['$event']) keyEvent(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.closeModal()
    }
  }

  destroy: Function;
  closeModal: Function;

  constructor() {
  }

  onCancel() {
    this.closeModal();
    this.destroy();
  }
}
