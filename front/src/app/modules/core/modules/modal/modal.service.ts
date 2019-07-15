import {ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef} from "@angular/core";

import {Observable, ReplaySubject} from "rxjs";

@Injectable()
export class ModalService {
  private vcRef: ViewContainerRef;
  private injector: Injector;
  public activeInstances = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  registerViewContainerRef(vcRef: ViewContainerRef): void {
    this.vcRef = vcRef;
  }

  registerInjector(injector: Injector): void {
    this.injector = injector;
  }

  create<T>(component: any, parameters?: Object): Observable<ComponentRef<T>> {
    let componentRef$ = new ReplaySubject();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRef = this.vcRef.createComponent(componentFactory, 0);
    Object.assign(componentRef.instance, parameters);
    this.activeInstances++;
    componentRef.instance['destroy'] = () => {
      this.activeInstances--;
      componentRef.destroy();
    };
    componentRef$.next(componentRef);
    componentRef$.complete();

    return <Observable<ComponentRef<T>>>componentRef$.asObservable();
  }
}
