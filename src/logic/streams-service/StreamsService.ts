import { ChatMessage } from "@/types/chat";
import { makeEventBus } from "../event-bus";
import { loadStreams, StreamsLibraryWrapper } from "./StreamsWrapper";
import { StreamsResponse, ActionQueue, ActiveClient, StreamsAction, ArchiveClient, MessageResponse } from "./types";

export class StreamsService {
    private static actionQueue: ActionQueue = {}
    private static eventBus = makeEventBus<{[key: string]: StreamsResponse;}>()

    public static async loadStreams(): Promise<void> {
        return loadStreams()
    }

    public static async startChat(client : ActiveClient, subscriptionLink: string): Promise<ActiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient, id: string) => {
                return StreamsLibraryWrapper.startChat(id, client, subscriptionLink)
            }
        )

        return result.client
    }

    public static async getKeyloadLink(client: ActiveClient): Promise<ActiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient, id: string) => {
                return StreamsLibraryWrapper.getKeyloadLink(id, client)
            }
        )

        return result.client
    }

    public static async sendMessage(client: ActiveClient, message: ChatMessage): Promise<MessageResponse> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient, id: string) => {
                return StreamsLibraryWrapper.sendMessage(id, client, message)}
        )

        return {
            client: result.client,
            messages: result.messages || []
        }
    }

    public static async fetchMessages(client: ActiveClient): Promise<ActiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient, id: string) => {
                return StreamsLibraryWrapper.fetchMessages(id, client)}
        )

        return result.client
    }

    public static async exportClient(client: ActiveClient, password: string): Promise<ArchiveClient> {
        const result = await StreamsService.addActionToQueue(
            client,
            async (client: ActiveClient, id: string) => {
                return StreamsLibraryWrapper.exportClient(id, client, password)
            }
        )

        return result.exportedClient!
    }

    // Simple Proxies

    public static async createChat(): Promise<ActiveClient> {
        return StreamsLibraryWrapper.createChat()
    }

    public static async joinChat(announcementLink: string): Promise<ActiveClient> {
        return StreamsLibraryWrapper.joinChat(announcementLink)
    }

    public static async importClient(archivedClient: ArchiveClient, password: string): Promise<ActiveClient> {
        return StreamsLibraryWrapper.importClient(archivedClient, password)
    }

    private static async addActionToQueue(client: ActiveClient ,action: StreamsAction )
    : Promise<StreamsResponse> {
        const id = Date.now().toString()

        if (!StreamsService.actionQueue[client.id]) {
            StreamsService.actionQueue[client.id] = []
        }

        StreamsService.actionQueue[client.id].push({
            id,
            action,
        })

        if(StreamsService.actionQueue[client.id].length === 1) {
            this.progressQueue(client)
        }


    return new Promise((resolve) => {
        StreamsService.eventBus.subscribe(id, 
            function resolveResponse ({client, messages, exportedClient}: StreamsResponse){
                StreamsService.eventBus.unsubscribe(id, resolveResponse)
                resolve({id, client, messages, exportedClient});
            })
        });
    }

    private static async progressQueue(client: ActiveClient): Promise<void> {
        const id = StreamsService.actionQueue[client.id][0].id
        const result = await StreamsService.actionQueue[client.id][0].action(client, id)
        this.eventBus.trigger(result.id, result)

        StreamsService.actionQueue[client.id].shift()
        if(StreamsService.actionQueue[client.id].length > 0) {
            this.progressQueue(result.client)
        }
    }


}