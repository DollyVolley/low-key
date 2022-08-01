export interface Storage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  hasItem: (key: string) => boolean;
  clear: () => void;
}

export enum StorageType {
  LocalStorage = 'local-storage',
}

export const DEFAULT_STORAGE_TYPE = StorageType.LocalStorage;
