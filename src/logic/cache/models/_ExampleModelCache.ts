import AbstractModelCache from '../AbstractModelCache';
import { StorageType } from '../types';

const MODEL_KEY = 'example';

class ExampleModelCache extends AbstractModelCache {
  constructor(id?: string, storageType?: StorageType) {
    super(MODEL_KEY, id, storageType);
  }

  // Your own methods here
}

export default ExampleModelCache;
