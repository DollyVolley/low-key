import { ClientLinks } from "@/logic/streams-service"
import { MOCK_CHAT } from "@/mock/constants"
import { useChatDataContext } from "@/state/chat-data"
import {  ChatMessage } from "@/types/chat"
import { useEffect, useState } from "react"
import { useChats } from "./useChats"

export function useChat(chatID: string):{
    name: string,
    links: ClientLinks
    messages: ChatMessage[],
    postMessage: (message: ChatMessage) => Promise<void>,
    markMessagesSeen: () => void,
} {

    const {setMessageSeen} = useChatDataContext()

    // @todo: get global chat via chatID
    const chat = MOCK_CHAT

    const {sendMessage } = useChats()

    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(()=> {
        setMessages(chat.data?.messages || [])
    }, [chat])


    async function postMessage(message: ChatMessage): Promise<void> {
        setMessages([...messages, message])
        // @todo get all messages from global store (?)

        await sendMessage(chat, message)
    }

    function markMessagesSeen(): void {
        setMessageSeen(chatID)
    }

    return {
        name: chat.data?.name || '',
        links: chat.client?.links || null,
        messages,
        postMessage,
        markMessagesSeen
    }
}

