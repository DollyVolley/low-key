import { ActiveClient } from "@/logic/streams-service";

export interface Chat {
    id: string,
    data: ChatData,
    client: ActiveClient,
}

export interface ChatData {
    id: string,
    name: string,
    messages: ChatMessage[],
    isStarted: boolean,
    isNewMessage: boolean
}

export interface ChatMessage {
    id: string,
    timestamp: number,
    isOwn: boolean,
    content: string,
    msgId?: string,
}

export interface ChatDescription {
    name: string,
    lastChange: number,
    chatID: string, 
    isStarted: boolean,
    isNewMessage: boolean,
    lastMessage?: ChatMessage
}

