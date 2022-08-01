import { Storage, StorageType } from './types';
import makeStorage from './factories/makeStorage';
import key from './utils/key';

abstract class AbstractModelCache {
  protected storage: Storage;

  protected modelKey: string;

  constructor(modelKey: string, entityId?: string, storageType?: StorageType) {
    this.storage = makeStorage(storageType);
    this.modelKey = key(modelKey, entityId);
  }

  clear(): void {
    this.storage.removeItem(this.modelKey);
  }
}

export default AbstractModelCache;
