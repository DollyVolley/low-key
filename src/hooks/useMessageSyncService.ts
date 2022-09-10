import { ActiveClient, ClientType, MessageResponse, StreamsService } from "@/logic/streams-service";
import { useChatClientContext } from "@/state/chat-client";
import { useMemo } from "react";
import { useInterval } from "./utils/useInterval";

export function useMessageSyncService(){
    const {clientMap, setClient, isReady} = useChatClientContext()

    useInterval(syncChats, 5000)

    const clients = useMemo(() => {
        return Object.values(clientMap)
    },[clientMap] )

    async function syncChats(){
        console.log(`Syncing: ${isReady}`)
        if(isReady ){
            clients.forEach(client => {                
                const hasStarted = client.links.lastMessage

                if(hasStarted ){ 
                    StreamsService.fetchMessages(client)
                    .then((response: MessageResponse) => {
                        setClient(response.client, response.messages)
                    })
                } else if(client.clientType === ClientType.SUBSCRIBER) {
                    StreamsService.getKeyloadLink(client).then((client: ActiveClient) => {
                        if(client.links.lastMessage) {
                            setClient(client)
                        }
                    })
                }
            })
        }
    }
}