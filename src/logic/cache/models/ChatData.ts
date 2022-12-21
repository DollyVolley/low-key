import { ArchiveClient } from '@/logic/streams-service';
import { ChatData } from '@/types/chat';
import AbstractModelCache from '../AbstractModelCache';
import {StorageType} from '../types';

const MODEL_KEY = 'CHAT_CONTACT';

export class ChatDataCache extends AbstractModelCache {
  constructor(id?: string, storageType?: StorageType) {
    super(MODEL_KEY, id, storageType);
  }

  get exists(): boolean {
    return this.storage.hasItem(this.modelKey);
  }

  getChatModelKey(chatID: string): string {
    return `${this.modelKey}-${chatID}`
  }

  get(chatID: string): ChatData | null {
    const chatDataSerialized = this.storage.getItem(this.getChatModelKey(chatID));

    if (!chatDataSerialized) return null;

    const chatData = JSON.parse(chatDataSerialized);
    return chatData as ChatData;
  }

  set(chatData: ChatData): void {
    console.log(`SET data for chat ${chatData.name} ${chatData.isStarted ? '' : '(inactive)'} with ${chatData.messages.length} messages`)
    this.storage.setItem(this.getChatModelKey(chatData.id), JSON.stringify(chatData));
  }

  remove(chatID: string): void {
    this.storage.removeItem(this.getChatModelKey(chatID));
  }
}

