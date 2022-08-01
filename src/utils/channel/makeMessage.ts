import { ChatMessage } from "@/logic/message-service";

export function makeMessage(content: string, isOwn: boolean): ChatMessage {
    return {
        timestamp: Date.now(),
        content,
        isOwn
    }
}