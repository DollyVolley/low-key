import { ActiveClient } from "@/logic/streams-service";

export interface Chat {
    id: string,
    data: ChatData,
    client: ActiveClient,
}

export interface ChatData {
    name: string,
    messages: ChatMessage[],
    isNewMessage: boolean
}

export interface ChatMessage {
    timestamp: number,
    isOwn: boolean,
    content: string,
    msgId?: string,
}

export interface ChatDescription {
    name: string,
    lastChange: number,
    chatID: string, 
    started: boolean,
    isNewMessage: boolean,
    lastMessage?: ChatMessage
}

