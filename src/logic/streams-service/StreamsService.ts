import { ClientType, StreamsActor, ArchiveClient, ActiveClient, MessageResponse} from "./types";
import {instantiateStreams} from "./lib/instantiateStreams";
import streamsLib from './lib/streams/streams'
import {generateSeed} from "./utils/generateSeed";
import { ChatMessage } from "@/types/chat";
import { AvatarClassKey } from "@mui/material";

const NODE_URL = "https://hornet.low-key.io/"
let streams: any

export async function loadStreams() {
    streams = await instantiateStreams()
    console.log("Streams loaded")
}

export class StreamsService  {

    public static async createChat(): Promise<ActiveClient> {
        const client = this.makeClient( ClientType.AUTHOR)
        const announcementLink = await this.announceChannel(client.streamsClient as streamsLib.Author)
        
        return {
            ...client,
            links: {
                ...client.links,
                announcement: announcementLink.toString()
            }
        }
    }

    public static async joinChat(announcementLink: string): Promise<ActiveClient> {
        const client = StreamsService.makeClient(ClientType.SUBSCRIBER)
        const subscriptionLink = await this.subscribeChannel(client.streamsClient as streamsLib.Subscriber, announcementLink)

        return {
            ...client,
            links: { 
                ...client.links,
                announcement: announcementLink,
                subscription: subscriptionLink
            }
        }
    }

    public static async startChat(client : ActiveClient, subscriptionLink: string): Promise<ActiveClient> {
        console.log(client, subscriptionLink)
        await StreamsService.acceptSubscription(client.streamsClient.clone() as streamsLib.Author, subscriptionLink)
        const messageLink = await this.sendKeyload(client.streamsClient as streamsLib.Author, client.links.announcement)

        return {
            ...client,
            links: {
                ...client.links,
                subscription: subscriptionLink,
                lastMessage: messageLink
            }
        }
    }

    public static async getKeyloadLink(client: ActiveClient): Promise<ActiveClient> {
        if(client.clientType === ClientType.AUTHOR) throw new Error("Author can't receive keyload")
        const result = await client.streamsClient.clone().fetchNextMsg()

        return {
            ...client,
            links: {
                ...client.links,
                lastMessage: result?.link.toString() || '' // @todo - might be an issue here!
            }
        }
    }


    public static async sendMessage(client: ActiveClient, message: ChatMessage): Promise<MessageResponse> {
        const address = streams.Address.parse(client.links.lastMessage)
        const publicPayload = streams.to_bytes("") 
        const maskedPayload = streams.to_bytes(message.content)
        const response = await client.streamsClient.clone().send_tagged_packet(address, publicPayload, maskedPayload)
        message.msgId = response.link.toMsgIndexHex()
        const lastMessageLink = response.link.toString()

        return {
            client: {
                ...client,
                links: {
                    ...client.links,
                    lastMessage: lastMessageLink
                       }
                    },
            messages: [message],
        }
    }

    public static async fetchMessages(client: ActiveClient): Promise<MessageResponse> {
        const msgs: streamsLib.UserResponse[] = await client.streamsClient.clone().fetchNextMsgs()

        let lastLink = client.links.lastMessage
        const messages = msgs.map((msg: streamsLib.UserResponse) => {
            lastLink = msg.link.toString()
            const content = streams.from_bytes(msg.message?.get_masked_payload())

            return {
                timestamp: Date.now(),
                content,
                isOwn: false,
                msgId: msg.link.toMsgIndexHex()
            } as ChatMessage
        })

        return {
            client: {
                ...client,
                links: {
                    ...client.links,
                    lastMessage: lastLink
                }
            },
            messages,
        }
    }

    public static importClient(archivedClient: ArchiveClient, password: string): ActiveClient {
        const clientUint8 = Uint8Array.from(window.atob(archivedClient.streamsClient), (v) => v.charCodeAt(0));

        const options = new streams.SendOptions(NODE_URL, true) as streamsLib.SendOptions
        const streamsClient = new streams.StreamsClient(NODE_URL, options.clone()) as streamsLib.StreamsClient

        let client: streamsLib.Author | streamsLib.Subscriber
        if(archivedClient.clientType === ClientType.AUTHOR) {
            client = streams.Author.import(streamsClient, clientUint8, password);
        } else {
            client = streams.Subscriber.import(streamsClient, clientUint8, password);
        }    

        return {
            ...archivedClient,
            streamsClient: client
        }
        
    }

    public static exportClient(activeClient: ActiveClient, password: string): ArchiveClient {
        const encryptedClient = activeClient.streamsClient.clone().export(password)
        const encryptedClientB64 = Buffer.from(encryptedClient).toString('base64');
                
        return {
            ...activeClient,
            streamsClient: encryptedClientB64
        }

    }

    private static makeClient(clientType: ClientType): ActiveClient {
        const seed = generateSeed(81)
        const sendOption = new streams.SendOptions(NODE_URL, true)

        let client :  streamsLib.Author | streamsLib.Subscriber
        let root = ''

        if(clientType === ClientType.AUTHOR) {
            client = new streams.Author(seed, sendOption.clone(), streams.ChannelType.SingleBranch ) as streamsLib.Author
            root = client.channel_address().toString() 
        } else {
            client = new streams.Subscriber(seed, sendOption.clone(), streams.ChannelType.SingleBranch ) as streamsLib.Subscriber
        }

        return {
            id: Date.now().toString(),
            clientType: clientType,
            streamsClient: client,
            links: {
                root: '',
                lastMessage: '',
                subscription: '',
                announcement: '',
            }
        }
    }

    private static async announceChannel(client: streamsLib.Author): Promise<string> {
        const announcementLink = await client.clone().send_announce() 
        return announcementLink.link.toString()
    }

    private static async subscribeChannel(client: streamsLib.Subscriber, announcementLink: string): Promise<string> {
        const address = streams.Address.parse(announcementLink) as streamsLib.Address
        await client.clone().receive_announcement(address.copy())
        const subscriptionLink = await client.clone().send_subscribe(address.copy())
        return subscriptionLink.link.toString()
    }

    private static async acceptSubscription(client: streamsLib.Author, subscriptionLink: string): Promise<void> {
        const address = streams.Address.parse(subscriptionLink)
        await client.clone().receive_subscribe(address) 
    }

    private static async sendKeyload(client: streamsLib.Author, lastLink: string): Promise<string> {
        const address = streams.Address.parse(lastLink)

        const keyloadLink = await client.clone().send_keyload_for_everyone(address) 
        return keyloadLink.link.toString()
    }
}


