import { ClientLinks } from "@/logic/streams-service"
import { chatSelectorFamily } from "@/store/chat/getters/chat"
import { ChatMessage } from "@/types/chat"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useChats } from "./useChats"

export function useChat(chatID: string):{
    name: string,
    links: ClientLinks
    messages: ChatMessage[],
    postMessage: (message: ChatMessage) => Promise<void>,
} {
    const chat = useRecoilValue(chatSelectorFamily(chatID))
    const {sendMessage } = useChats()
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(()=> {
        setMessages(chat.data.messages)
    }, [chat])


    async function postMessage(message: ChatMessage): Promise<void> {
        setMessages([...messages, message])
        await sendMessage(chat, message)
    }

    return {
        name: chat.data.name,
        links: chat?.client.links || null,
        messages,
        postMessage,
    }
}

