import { StreamsService } from "@/logic/streams-service"
import { useChatClientContext } from "@/state/chat-client"
import { useChatDataContext } from "@/state/chat-data"
import {  ChatMessage } from "@/types/chat"

export function useCurrentChat(){
    const {currentChatData, currentChatID, addMessages} = useChatDataContext()
    const {client, setClient, isReady} = useChatClientContext(currentChatID)
    const {setMessageSeen} = useChatDataContext()

    async function postMessage(message: ChatMessage): Promise<void> {
        if(!isReady) return
        addMessages(currentChatID, [message])
        const response = await StreamsService.sendMessage(client!, message)
        setClient(response.client,  response.messages)
    }

    function markMessagesSeen(): void {
        setMessageSeen(currentChatID)
    }

    return {
        id: currentChatID,
        name: currentChatData?.name,
        links: client?.links || null,
        messages: currentChatData?.messages || [],
        postMessage,
        markMessagesSeen,
        isClientLoaded: isReady,
        clientType: client?.clientType,
        isStarted: currentChatData?.isStarted
    }
}

