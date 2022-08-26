import { ClientType, StreamsActor } from "@/logic/streams-service";
import { Chat, ChatDescription } from "@/types/chat";

export const MOCK_CURRENT_CHAT_ID = ":)"

export const MOCK_CHAT: Chat = {
    id: ":)",
    data: {
        name: ":)",
        messages: [],
        isNewMessage: false,
    },
    client: {
        id: ":)",
        streamsClient: ":)" as unknown as StreamsActor,
        clientType: ClientType.AUTHOR,
        links: {
            subscription: ":)",
            announcement: ":)",
            lastMessage: ":)",
            root: ":)",
        }
    }
}

export const MOCK_CHAT_DESCRIPTIONS: ChatDescription[] = [
    {
        chatID: ":)",
        name: ":)",
        isNewMessage: false,
        lastChange: Date.now(),
        started: false,
        lastMessage: {
            content: ":)",
            timestamp: Date.now(),
            isOwn: false,
            msgId: ":)"
        }

    }
]
