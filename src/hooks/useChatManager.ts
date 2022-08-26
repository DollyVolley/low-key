import { MOCK_CHAT } from "@/mock/constants"
import { useChats } from "./useChats"

export function useChatManager():{
    createChat: (name: string) => Promise<string>,
    joinChat: (name: string, announcementLink: string) => Promise<string>,
    startChat: (subscriptionLink: string) => Promise<void>,
} {    
    const {createChat, joinChat, startChat: startParticularChat} = useChats()

    const currentChat = MOCK_CHAT

    function startChat(subscriptionLink: string): Promise<void> {
        return startParticularChat(currentChat!, subscriptionLink)
    }
  
    return {
        createChat,
        joinChat,
        startChat,
    }

}

