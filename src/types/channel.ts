import { ChatMessage } from "@/logic/message-service";

export interface ChannelDescription {
    name: string,
    lastChange: number,
    channelID: string, // channel root
    started: boolean,
    lastMessage?: ChatMessage
}

