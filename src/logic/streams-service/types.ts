import { ChatMessage } from '@/types/chat'
import streamsLib from './lib/streams'

export type ActionQueue = {[key in string]: StreamsQueueRequest[]}

export type StreamsAction = (client: ActiveClient) => Promise<StreamsResponse>

export interface StreamsQueueRequest {
    id: string,
    action: StreamsAction
}

export interface StreamsResponse {
    client: ActiveClient,
    exportedClient?: ArchiveClient,
    messages?: ChatMessage[]
}

export interface MessageResponse {
    client: ActiveClient,
    messages: ChatMessage[],
}

export type StreamsActor = streamsLib.Author | streamsLib.Subscriber

export interface MessageServiceConfig {
    nodeURL?: string,
}

export interface ActiveClient extends BaseClient {
    streamsClient: StreamsActor 
}

export interface ArchiveClient extends BaseClient {
    streamsClient: string,
}

export interface BaseClient {
    id: string
    clientType: ClientType,
    links: ClientLinks
}

export interface ClientLinks {
    root: string,
    announcement: string,
    subscription: string,
    lastMessage: string,
}

export enum ClientType {
    AUTHOR = "AUTHOR",
    SUBSCRIBER = "SUBSCRIBER"
}

