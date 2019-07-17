import {HostListener} from "@angular/core";

// Нужен для создания типовых контейнеров
export class CustomModalComponent {
  // Клавиши управления
  @HostListener('window:keyup', ['$event']) keyEvent(e: KeyboardEvent) {
    // Escape - закрыть окно
    if (e.code === 'Escape') {
      this.onCancel()
    }
  }

  destroy: Function;

  onCancel() {
    this.destroy();
  }
}
