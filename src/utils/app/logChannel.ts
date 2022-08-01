import { ActiveChannel } from "@/logic/message-service";

export function logChannel(channel: ActiveChannel): void {
    console.debug(`[Channel Info]: ${channel.name} (${channel.links.lastMessage? 'active': 'staged'}) with ${channel.messages.length} messages`);
}