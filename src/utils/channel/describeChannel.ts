import {  ChatData, ChatDescription } from "@/types/chat";

export function describeChat(chatData: ChatData): ChatDescription {
    let lastMessage = undefined
    let lastChange = Date.now()

    if(chatData.messages.length) {
        lastMessage = chatData.messages[chatData.messages.length - 1]
        lastChange = lastMessage.timestamp
    }

    return {
        name: chatData.name,
        chatID: chatData.id,
        lastMessage,
        lastChange,
        isStarted: chatData.isStarted,
        isNewMessage: chatData.isNewMessage,
    }
}