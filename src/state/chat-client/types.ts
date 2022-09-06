import { ActiveClient } from "@/logic/streams-service";

export interface ChatClientOption {
    getClientByID: (id: string) => Promise<ActiveClient>,
    setClient: (client: ActiveClient) => Promise<void> 
}