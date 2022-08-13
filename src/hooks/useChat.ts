import { ClientLinks } from "@/logic/streams-service"
import { chatDataAtomFamily } from "@/store"
import { chatSelectorFamily } from "@/store/chat/getters/chat"
import { mutexAtomFamily } from "@/store/utils/mutex"
import { Chat, ChatMessage } from "@/types/chat"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { useChats } from "./useChats"

export function useChat(chatID: string):{
    name: string,
    links: ClientLinks
    messages: ChatMessage[],
    postMessage: (message: ChatMessage) => Promise<void>,
    markMessagesSeen: () => void,
} {
    const [chat, setChat] = useRecoilState(chatSelectorFamily(chatID))

    const {sendMessage } = useChats()

    const [messages, setMessages] = useState<ChatMessage[]>([])

    const [mutex, setMutex] = useRecoilState(mutexAtomFamily(chatID))

    const [messageQueue, setMessageQueue] = useState<ChatMessage[]>([])


    useEffect(()=> {
        setMessages(chat.data?.messages || [])
    }, [chat])

    useEffect(function postMessage(){
        if(!mutex) {
            postQueuedMessages()
        }
    }, [mutex])

    async function postMessage(message: ChatMessage): Promise<void> {
        setMessages([...messages, message])

        if(mutex) {
            setMessageQueue(messages => [...messages, message])
            return
        }
        setMutex(true)
        await sendMessage(chat, message)
        setMutex(false)
    }

    async function postQueuedMessages(): Promise<void> {
        setMutex(true)
        const queue = [...messageQueue]
        for(let message of queue) {
            await sendMessage(chat, message)
        }

        setMessageQueue([])
        setMutex(false)
    }

    function markMessagesSeen(): void {
        setChat({
            ...chat, 
            data: {
                ...chat.data!,
                isNewMessage: false
            }
        })
    }

    return {
        name: chat.data?.name || '',
        links: chat.client?.links || null,
        messages,
        postMessage,
        markMessagesSeen
    }
}

