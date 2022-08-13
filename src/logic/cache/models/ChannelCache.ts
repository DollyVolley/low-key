import { ArchiveClient } from '@/logic/streams-service';
import AbstractModelCache from '../AbstractModelCache';
import {StorageType} from '../types';

const MODEL_KEY = 'CHAT_CONTACT';

class ChannelCache extends AbstractModelCache {
  constructor(id?: string, storageType?: StorageType) {
    super(MODEL_KEY, id, storageType);
  }

  get exists(): boolean {
    return this.storage.hasItem(this.modelKey);
  }

  getChatModelKey(channelAddress: string): string {
    return `${this.modelKey}-${channelAddress}`
  }

  get(chatId: string): ArchiveClient | null {
    const contactsSerialized = this.storage.getItem(this.getChatModelKey(chatId));

    if (!contactsSerialized) return null;

    const contact = JSON.parse(contactsSerialized);
    return contact as ArchiveClient;
  }

  set(client: ArchiveClient): void {
    this.storage.setItem(this.getChatModelKey(client.id), JSON.stringify(client));
  }

  remove(chatID: string): void {
    this.storage.removeItem(this.getChatModelKey(chatID));
  }
}

export default ChannelCache;
