import {Component, Injector, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {CustomModalService} from "../../shared/services/custom-modal.service";

@Component({
  selector: 'ui-modal-placeholder, uiModalPlaceholder',
  template: `
    <div #modalPlaceholder></div>`,
  exportAs: 'uiModalPlaceholder'
})
export class ModalPlaceholderComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef, static: true}) viewContainerRef;

  constructor(private modalService: CustomModalService, private injector: Injector) {

  }

  ngOnInit(): void {
    this.modalService.registerViewContainerRef(this.viewContainerRef);
    this.modalService.registerInjector(this.injector);
  }
}
