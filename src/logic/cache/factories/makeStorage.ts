import { StorageType, Storage, DEFAULT_STORAGE_TYPE } from '../types';
import LocalStorage from '../storages/LocalStorage';

function makeStorage(type: StorageType = DEFAULT_STORAGE_TYPE): Storage {
  const storages = {
    [StorageType.LocalStorage]: new LocalStorage(),
  };

  if (!storages[type]) {
    throw new Error(`Storage type ${type} is undefined`);
  }

  return storages[type];
}

export default makeStorage;
