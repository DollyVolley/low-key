import streamsLib from './lib/streams'

export type StreamsActor = streamsLib.Author | streamsLib.Subscriber

export interface MessageServiceConfig {
    nodeURL?: string,
}

export interface ChatMessage {
    timestamp: number,
    isOwn: boolean,
    content: string,
    msgId?: string,
}

export enum ClientType {
    AUTHOR = "AUTHOR",
    SUBSCRIBER = "SUBSCRIBER"
}

export interface BaseChannel {
    name: string,
    channelID: string,
    clientType: ClientType,
    messages: ChatMessage[],
    links: ChannelLinks
}

export interface ArchiveChannel extends BaseChannel {
    client: string
}

export interface ActiveChannel extends BaseChannel {
    client: StreamsActor
}

export interface ChannelLinks {
    root: string,
    announcement: string,
    subscription: string,
    lastMessage: string,
}

export interface BasePackage {
    client: ActiveChannel,
    payload: any
}

export interface LinkPackage extends BasePackage {
    payload: {
        link: string
    }
}

export interface MessagesPackage extends BasePackage {
    payload: {
        messages: ChatMessage[],
        link: string
    }
}
