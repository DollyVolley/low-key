import { ActiveClient } from "@/logic/streams-service";

export interface ChatClientOption {
    currentClient: ActiveClient,
    getClientByID: (id: string) => Promise<ActiveClient>,
    setClient: (client: ActiveClient) => Promise<void> 
}