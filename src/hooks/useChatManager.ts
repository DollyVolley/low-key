import { StreamsService } from "@/logic/streams-service"
import { useChatClientContext } from "@/state/chat-client"
import { useChatDataContext } from "@/state/chat-data"
import { ChatData } from "@/types/chat"

export function useChatManager() {    
    const {setClient, isReady, clientMap} = useChatClientContext()
    const {setChatData, setCurrentChatID } = useChatDataContext()

    async function createChat(name: string): Promise<string> {
        const updatedClient = await StreamsService.createChat()
        setClient(updatedClient)
        createChatData(name, updatedClient.id)
        setCurrentChatID(updatedClient.id)
        return updatedClient.id
    }

    async function joinChat(name: string, announcementLink: string) {
        const updatedClient = await StreamsService.joinChat(announcementLink)
        setClient(updatedClient)
        createChatData(name, updatedClient.id)

        setCurrentChatID(updatedClient.id)        
        return updatedClient.id
    }

    async function startChat(chatID: string, subscriptionLink: string) {
        const client = clientMap[chatID]
        const updatedClient = await StreamsService.startChat(client!, subscriptionLink)
        setClient(updatedClient)
    }

    function createChatData(name: string, chatID: string) {
        const chatData: ChatData = {
            name,
            id: chatID,
            isStarted: false,
            messages: [],
            isNewMessage: false,
        }
        setChatData(chatData)
    }
  
    return {
        createChat,
        joinChat,
        startChat,
        isReady
    }

}

