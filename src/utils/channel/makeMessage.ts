import { ChatMessage } from "@/types/chat";

export function makeMessage(content: string, isOwn: boolean): ChatMessage {
    return {
        timestamp: Date.now(),
        content,
        isOwn
    }
}