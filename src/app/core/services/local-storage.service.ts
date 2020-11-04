import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage = window.localStorage;

  setItem(key: string, value: string | object): void {
    const serializedValue = JSON.stringify(value);
    this.storage.setItem(key, serializedValue);
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
