import AbstractModelCache from '../AbstractModelCache';
import {StorageType} from '../types';
import {ArchiveChannel, ActiveChannel} from "../../message-service/types";

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

  get(channelAddress: string): ArchiveChannel | null {
    const contactsSerialized = this.storage.getItem(this.getChatModelKey(channelAddress));

    if (!contactsSerialized) return null;

    const contact = JSON.parse(contactsSerialized);
    return contact as ArchiveChannel;
  }

  set(channel: ArchiveChannel): void {
    if(!channel) return
    this.storage.setItem(this.getChatModelKey(channel.channelID), JSON.stringify(channel));
  }

  remove(channelId: string): void {
    this.storage.removeItem(this.getChatModelKey(channelId));
  }
}

export default ChannelCache;
