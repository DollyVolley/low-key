import { ActiveClient } from "@/logic/streams-service";
import { ChatMessage } from "@/types/chat";

export interface ChatClientOption {
    clientMap: Record<string, ActiveClient>,
    setClient: (client: ActiveClient, messages?: ChatMessage[]) => Promise<void>,
    isReady: boolean,
    removeClient: (clientID: string) => void
}