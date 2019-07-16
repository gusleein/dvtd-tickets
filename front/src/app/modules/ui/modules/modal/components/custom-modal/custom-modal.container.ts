export class CustomModalContainer {
  destroy: Function;
  componentIndex: number;

  closeModal(): void {
    this.destroy();
  }
}

export function Modal() {
  return function (target) {
    Object.assign(target.prototype, CustomModalContainer.prototype);
  };
}
