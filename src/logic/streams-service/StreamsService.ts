import { ChatMessage } from "@/types/chat";
import { makeEventBus } from "../event-bus";
import { loadStreams, StreamsLibraryWrapper } from "./StreamsLibraryWrapper";
import { StreamsResponse, ActionQueue, ActiveClient, StreamsAction, ArchiveClient, MessageResponse, IsFetchQueuedMap } from "./types";
import { v4 as uuidv4 } from 'uuid';

export class StreamsService {
    public static actionQueue: ActionQueue = {}
    public static isFetchQueued: IsFetchQueuedMap = {}
    private static eventBus = makeEventBus<{[key: string]: StreamsResponse;}>()

    public static async loadStreams(): Promise<void> {
        return loadStreams()
    }

    public static async startChat(client : ActiveClient, subscriptionLink: string): Promise<ActiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient) => {
                return StreamsLibraryWrapper.startChat(client, subscriptionLink)
            }
        )

        return result.client
    }

    public static async getKeyloadLink(client: ActiveClient): Promise<ActiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient) => {
                return StreamsLibraryWrapper.getKeyloadLink(client)
            }
        )

        return result.client
    }

    public static async sendMessage(client: ActiveClient, message: ChatMessage): Promise<MessageResponse> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient) => {
                return StreamsLibraryWrapper.sendMessage(client, message)}
        )

        return {
            client: result.client,
            messages: result.messages!
        }
    }

    public static async fetchMessages(client: ActiveClient): Promise<void | MessageResponse> {
        // Do not queue fetch if already in queue
        if(StreamsService.isFetchQueued[client.id]) return

        StreamsService.isFetchQueued[client.id] = true;
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient) => {
                return StreamsLibraryWrapper.fetchMessages(client)}
        )

        StreamsService.isFetchQueued[client.id] = false;

        return {
            client: result.client,
            messages: result.messages || []
        }
    }

    public static async exportClient(client: ActiveClient, password: string): Promise<ArchiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient) => {
                return StreamsLibraryWrapper.exportClient(client, password)
            }
        )
    
        return result.exportedClient!
    }

    // Simple Proxies as no ActiveClient is passed as parameter

    public static async createChat(): Promise<ActiveClient> {
        return StreamsLibraryWrapper.createChat()
    }

    public static async joinChat(announcementLink: string): Promise<ActiveClient> {
        return StreamsLibraryWrapper.joinChat(announcementLink)
    }

    public static async importClient(archivedClient: ArchiveClient, password: string): Promise<ActiveClient> {
        return StreamsLibraryWrapper.importClient(archivedClient, password)
    }

    private static async addActionToQueue(client: ActiveClient, action: StreamsAction )
    : Promise<StreamsResponse> {
        const id = uuidv4()

        if (!StreamsService.actionQueue[client.id]) {
            StreamsService.actionQueue[client.id] = []
        }

        StreamsService.actionQueue[client.id].push({
            id,
            action,
        })

        // nothing currently going on, first element in the queue so starting it
        if(StreamsService.actionQueue[client.id].length === 1) {
            this.progressQueue(client)
        }

        return new Promise((resolve) => {
            console.log(`Add ${client.id} to queue (size: ${StreamsService.actionQueue[client.id].length})`)
            StreamsService.eventBus.subscribe(id, 
                function resolveResponse ({client, messages, exportedClient}: StreamsResponse){
                    StreamsService.eventBus.unsubscribe(id, resolveResponse)
                    console.log(`Final ${client.id} with ${messages?.length}`)
                    resolve({client, messages, exportedClient});
            })
        });
    }

    private static async progressQueue(client: ActiveClient): Promise<void> {
        const id = StreamsService.actionQueue[client.id][0].id
        const result = await StreamsService.actionQueue[client.id][0].action(client)
        this.eventBus.trigger(id, result)

        StreamsService.actionQueue[client.id].shift()
        if(StreamsService.actionQueue[client.id].length > 0) {
            this.progressQueue(result.client)
        }
    }
}