import { StreamsService } from "@/logic/streams-service";
import { currentChatIDAtom } from "@/store";
import { chatSelectorFamily } from "@/store/chat/getters/chat";
import { Chat, ChatMessage } from "@/types/chat";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil"

/* Notice
    As streams needs to be treated as singleton, this hook must always be used in order to
    avoid crashing due to multiple borrows 
    Streams was written in rust, ownership principle also applies here
*/
export function useChats():{
    createChat: (name: string) => Promise<string>,
    joinChat: (name: string, announcementLink: string) => Promise<string>,
    startChat: (chat: Chat, subsctionLink: string) => Promise<void>,
    sendMessage: (chat: Chat, message: ChatMessage) => Promise<void>,
    syncMessages: (chat: Chat) => Promise<void>,
    checkChatStarted: (chat: Chat) => Promise<boolean>,
}{
    const [currentChannelID, setCurrentChannelID] = useRecoilState(currentChatIDAtom)
    const setChannel = useRecoilCallback(
        ({ set }) =>
          (chat: Chat) => {
            set(chatSelectorFamily(chat.id), chat);
          },
        [],
    )

    async function createChat(name: string): Promise<string> {
        const client = await StreamsService.createChat()
        setChannel({
            id: client.id,
            client,
            data: {
                name,
                messages: [],
                isNewMessage: false,
            }
        })

        setCurrentChannelID(client.id)

        return client.id
    }

    async function joinChat(name: string, announcementLink: string): Promise<string> {
        const client = await StreamsService.joinChat(announcementLink)
        setChannel({
            id: client.id,
            client: client,
            data: {
                name,
                messages: [],
                isNewMessage: false,
            }
        })

        setCurrentChannelID(client.id)

        return client.id
    }

    async function startChat(chat: Chat, subscriptionLink: string): Promise<void> {
        const client = await StreamsService.startChat(chat.client, subscriptionLink)

        setChannel({
            ...chat,
            client,
        })
    }
    
    async function sendMessage(chat: Chat , message: ChatMessage): Promise<void> {
        const response = await StreamsService.sendMessage(chat.client, message)
        const messages = [...chat.data.messages, ...response.messages]

        setChannel({
            ...chat,
            client: response.client,
            data: {
                ...chat.data,
                messages,
            }
        })
    }

    async function syncMessages(chat: Chat): Promise<void> {
        const response = await StreamsService.fetchMessages(chat.client)
        if(response.messages.length === 0) return

        const messages = [...chat.data.messages, ...response.messages]
        const isUnseenMessage = currentChannelID !== chat.id

        setChannel({
            ...chat,
            client: response.client,
            data: {
                ...chat.data,
                messages,
                isNewMessage: isUnseenMessage
            }
        })
    }


    async function checkChatStarted(chat: Chat): Promise<boolean> {
        const client = await StreamsService.getKeyloadLink(chat.client)

        if(!client.links.lastMessage) return false

        setChannel({
            ...chat,
            client,
        })

        return true
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