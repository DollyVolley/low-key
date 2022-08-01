import { Storage } from '../types';

class LocalStorage implements Storage {
  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  hasItem(key: string): boolean {
    return window.localStorage.getItem(key) !== null;
  }

  clear(): void {
    window.localStorage.clear();
  }
}

export default LocalStorage;
