import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class LocalStorageService implements Storage {
  clearEvent: EventEmitter<void> = new EventEmitter<void>();
  setItemEvent = new EventEmitter<{ key: string, data: string }>();
  removeItemEvent = new EventEmitter<string>();

  [key: string]: any;

  [index: number]: string;

  constructor() {
  }

  clear(): void {
    this.clearEvent.emit();
    localStorage.clear();
  }

  getItem(key: string): string | any {
    return localStorage.getItem(key);
  }

  key(index: number): string | any {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    this.removeItemEvent.emit(key);
    return localStorage.removeItem(key);
  }

  setItem(key: string, data: string): void {
    this.setItemEvent.emit({key: key, data: data});
    return localStorage.setItem(key, data);
  }

  get length(): number {
    return localStorage.length;
  }
}
