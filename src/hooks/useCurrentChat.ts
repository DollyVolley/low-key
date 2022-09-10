import { StreamsService } from "@/logic/streams-service"
import { useChatClientContext } from "@/state/chat-client"
import { useChatDataContext } from "@/state/chat-data"
import {  ChatMessage } from "@/types/chat"
import { useEffect, useState } from "react"

export function useCurrentChat(){
    const {currentChatData, currentChatID, addMessagesToChat} = useChatDataContext()
    const {client, setClient, isReady} = useChatClientContext(currentChatID)
    const {setMessageSeen} = useChatDataContext()
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(()=> {
        setMessages(currentChatData?.messages || [] )
    }, [currentChatData])


    async function postMessage(message: ChatMessage): Promise<void> {
        if(!isReady) return
        setMessages([...messages, message])
        const response = await StreamsService.sendMessage(client!, message)
        addMessagesToChat(currentChatID, response.messages)

        setClient(response.client)
    }

    function markMessagesSeen(): void {
        setMessageSeen(currentChatID)
    }

    return {
        name: currentChatData?.name,
        links: client?.links || null,
        messages,
        postMessage,
        markMessagesSeen,
        isClientLoaded: isReady,
        id: currentChatData?.id,
        clientType: client?.clientType,
        isStarted: currentChatData?.isStarted
    }
}

