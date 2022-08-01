import AbstractModelCache from '../AbstractModelCache';
import {StorageType} from '../types';
import { Account } from '@/types/account';

const MODEL_KEY = 'CHANNEL_ADDRESSES_CACHE';

class AccountCache extends AbstractModelCache {
  constructor(id?: string, storageType?: StorageType) {
    super(MODEL_KEY, id, storageType);
  }

  get exists(): boolean {
    return this.storage.hasItem(this.modelKey);
  }

  get(): Account | null {
    const messagesSerialized = this.storage.getItem(this.modelKey)

    if (!messagesSerialized) return null;

    return JSON.parse(messagesSerialized) as Account;
  }

  set(account: Account): void {
    this.storage.setItem(this.modelKey, JSON.stringify(account));
  }
}

export default AccountCache;
