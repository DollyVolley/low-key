import { StreamsService } from "@/logic/streams-service";
import { MOCK_CURRENT_CHAT_ID } from "@/mock/constants";
import { Chat, ChatMessage } from "@/types/chat";

export function useChats():{
    createChat: (name: string) => Promise<string>,
    joinChat: (name: string, announcementLink: string) => Promise<string>,
    startChat: (chat: Chat, subsctionLink: string) => Promise<void>,
    sendMessage: (chat: Chat, message: ChatMessage) => Promise<void>,
    syncMessages: (chat: Chat) => Promise<void>,
    checkChatStarted: (chat: Chat) => Promise<void>,
}{    

    // @todo: set global states after each of these actions
    async function createChat(name: string): Promise<string> {
        const client = await StreamsService.createChat()
        const updatedChat = {
            id: client.id,
            client,
            data: {
                name,
                messages: [],
                isNewMessage: false,
            }
        }
        return client.id
    }

    async function joinChat(name: string, announcementLink: string): Promise<string> {
        const client = await StreamsService.joinChat(announcementLink)
        const updatedChat = {
            id: client.id,
            client: client,
            data: {
                name,
                messages: [],
                isNewMessage: false,
            }
        }

        return client.id
    }

    async function startChat(chat: Chat, subscriptionLink: string): Promise<void> {
        const client = await StreamsService.startChat(chat.client, subscriptionLink)
        const updatedChat = {
            ...chat,
            client,
        }
    }
    
    async function sendMessage(chat: Chat , message: ChatMessage): Promise<void> {
        console.log(`Send ${chat.id}`)
        const client = await StreamsService.sendMessage(chat.client, message)
        const messages = [...chat.data.messages, message]

        const updatedChat = {
            ...chat,
            client: client,
            data: {
                ...chat.data,
                messages,
            }
        }
    }

    async function syncMessages(chat: Chat): Promise<void> {
        console.log(`Sync ${chat.id}`)

        const response = await StreamsService.fetchMessages(chat.client)
        if(response.messages.length === 0) return

        const messages = [...chat.data.messages, ...response.messages]
        const isUnseenMessage =  MOCK_CURRENT_CHAT_ID !== chat.id

        const updatedChat = {
            ...chat,
            client: response.client,
            data: {
                ...chat.data,
                messages,
                isNewMessage: isUnseenMessage
            }
        }

    }


    async function checkChatStarted(chat: Chat): Promise<void> {
        const client = await StreamsService.getKeyloadLink(chat.client)

        if(!client.links.lastMessage) return 

        const updatedChat = {
            ...chat,
            client,
        }
    }

    return {
        createChat,
        joinChat,
        startChat,
        sendMessage,
        syncMessages,
        checkChatStarted
    }
}