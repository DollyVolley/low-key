import { ArchiveClient } from '@/logic/streams-service';
import AbstractModelCache from '../AbstractModelCache';
import {StorageType} from '../types';

const MODEL_KEY = 'CHAT_CLIENT';

export class ChatClientCache extends AbstractModelCache {
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
    const clientSerialized = this.storage.getItem(this.getChatModelKey(chatId));

    if (!clientSerialized) return null;

    const client = JSON.parse(clientSerialized);
    return client as ArchiveClient;
  }

  set(client: ArchiveClient): void {
    console.log(`SET client for ${client.id} ${JSON.stringify(client.links)}`)
    this.storage.setItem(this.getChatModelKey(client.id), JSON.stringify(client));
  }

  remove(chatID: string): void {
    this.storage.removeItem(this.getChatModelKey(chatID));
  }
}
