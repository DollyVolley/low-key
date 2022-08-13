import { Chat, ChatData, ChatDescription } from "@/types/chat";

export function describeChannel(chat: Chat): ChatDescription {
    let lastMessage = undefined
    let lastChange = Date.now()

    if(chat.data.messages.length) {
        lastMessage = chat.data.messages[chat.data.messages.length - 1]
        lastChange = lastMessage.timestamp
    }

    return {
        name: chat.data.name,
        chatID: chat.id,
        lastMessage,
        lastChange,
        started: !!chat.client.links.lastMessage 
    }
}