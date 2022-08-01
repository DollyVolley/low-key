import {ArchiveChannel, ActiveChannel, ChatMessage, ClientType} from "./types";
import {instantiateStreams} from "./lib/instantiateStreams";
import streamsLib from './lib/streams'
import {generateSeed} from "./utils/generateSeed";

const NODE_URL = "https://hornet.low-key.io/"
let streams: any

export async function loadStreams() {
    streams = await instantiateStreams()
    console.log("Streams loaded")
}

export class MessageService  {
    public static async createChannel(name: string): Promise<ActiveChannel> {
        const channel = MessageService.makeChannel(name, ClientType.AUTHOR)
        const announcementLink = await MessageService.announceChannel(channel.client as streamsLib.Author)
        
        channel.channelID = Date.now().toString()
        channel.links.announcement = announcementLink.toString()
        return channel
    }

    public static async joinChannel(name: string, announcementLink: string): Promise<ActiveChannel> {
        const channel = MessageService.makeChannel(name, ClientType.SUBSCRIBER)

        const subscriptionLink = await MessageService.subscribeChannel(channel.client as streamsLib.Subscriber, announcementLink)

        channel.channelID = Date.now().toString()
        channel.links.announcement = announcementLink
        channel.links.subscription = subscriptionLink

        return channel
    }

    public static async startChannel(channel: ActiveChannel, announcementLink: string, subscriptionLink: string): Promise<ActiveChannel> {
        await MessageService.acceptSubscription(channel.client.clone() as streamsLib.Author, subscriptionLink)
        const messageLink = await MessageService.sendKeyload(channel.client as streamsLib.Author, announcementLink)

        console.info(`[Channel Started]: ${channel.name} @ ${messageLink}`)

        return {...channel,
            links: {...channel.links,
                lastMessage: messageLink
            }
        }
    }

    public static async getKeyloadLink(channel: ActiveChannel): Promise<ActiveChannel> {
        if(channel.clientType === ClientType.AUTHOR) throw new Error("Author can't receive keyload")
        const result = await channel.client.clone().fetchNextMsg()

        const updatedChannel = {...channel,
            links: {...channel.links, 
                lastMessage: result?.link.toString() || ''
            }
        }
        
        return updatedChannel
    }


    public static async sendMessage(channel: ActiveChannel, message: ChatMessage): Promise<ActiveChannel> {
        const address = streams.Address.parse(channel.links.lastMessage)
        const publicPayload = streams.to_bytes("low key") //@todo get rid of this
        const maskedPayload = streams.to_bytes(message.content)
        const response = await channel.client.clone().send_tagged_packet(address, publicPayload, maskedPayload)
        message.msgId = response.link.toMsgIndexHex()
        const lastMessageLink = response.link.toString()

        console.debug(`[Sent Message]: ${channel.name} @ ${lastMessageLink}: ${message.content}`)

        const updatedChannel = {...channel,
            messages: [...channel.messages, message],
            links: {...channel.links, lastMessage: lastMessageLink
            }
        }
        
        return updatedChannel
    }

    public static async fetchMessages(channel: ActiveChannel): Promise<ActiveChannel> {
        const msgs: streamsLib.UserResponse[] = await channel.client.clone().fetchNextMsgs()

        let lastLink = channel.links.lastMessage
        const messages = msgs.map((msg: streamsLib.UserResponse) => {
            lastLink = msg.link.toString()
            const content = streams.from_bytes(msg.message?.get_masked_payload())

            console.debug(`[Received Message]: ${channel.name} @ ${lastLink}: ${content}`)

            return {
                timestamp: Date.now(),
                content,
                isOwn: false,
                msgId: msg.link.toMsgIndexHex()
            } as ChatMessage
        })

        const updatedChannel = {...channel,
            messages: [...channel.messages, ...messages], 
            links: {...channel.links, lastMessage: lastLink}}

        return updatedChannel
    }

    public static importChannel(channel: ArchiveChannel, password: string): ActiveChannel {
        const clientUint8 = Uint8Array.from(window.atob(channel.client), (v) => v.charCodeAt(0));

        const options = new streams.SendOptions(NODE_URL, true) as streamsLib.SendOptions
        const streamsClient = new streams.StreamsClient(NODE_URL, options.clone()) as streamsLib.StreamsClient

        let client: streamsLib.Author | streamsLib.Subscriber
        if(channel.clientType === ClientType.AUTHOR) {
            client = streams.Author.import(streamsClient, clientUint8, password);
        } else {
            client = streams.Subscriber.import(streamsClient, clientUint8, password);
        }    

        return {
            ...channel, 
            client
        } as ActiveChannel
    }

    public static exportChannel(channel: ActiveChannel, password: string): ArchiveChannel {
        const encryptedClient = channel.client.clone().export(password)
        const encryptedClientB64 = Buffer.from(encryptedClient).toString('base64');
                
        return {
            ...channel,
            client: encryptedClientB64
        }
    }

    private static makeChannel(name: string, clientType: ClientType): ActiveChannel {
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
            name,
            clientType: clientType,
            client,
            channelID: "",
            messages: [],
            links: {
                root,
                announcement: "",
                subscription: "",
                lastMessage: ""
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


