import {Component, Injector, OnInit, ViewChild, ViewContainerRef} from "@angular/core";

import {ModalService} from "./modal.service";

@Component({
  selector: 'modal-placeholder, modalPlaceholder',
  template: `
    <div #modalPlaceholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef, static: true}) viewContainerRef;

  constructor(private modalService: ModalService, private injector: Injector) {

  }

  ngOnInit(): void {
    this.modalService.registerViewContainerRef(this.viewContainerRef);
    this.modalService.registerInjector(this.injector);
  }
}
