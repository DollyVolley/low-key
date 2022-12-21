import { ChatMessage } from "@/types/chat";
import { v4 as uuidv4 } from 'uuid';

export function makeMessage(content: string, isOwn: boolean): ChatMessage {
    return {
        id: uuidv4(),
        timestamp: Date.now(),
        content,
        isOwn
    }
}