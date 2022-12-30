import { ActiveClient, ClientType, MessageResponse, StreamsService } from "@/logic/streams-service";
import { useChatClientContext } from "@/state/chat-client";
import { playNotificationSound } from "@/utils/app/playNotificationSound";
import { useCallback, useMemo } from "react";
import { useInterval } from "./utils/useInterval";

export function useMessageSyncService(){
    const {clientMap, setClient, isReady} = useChatClientContext()

    const clients = useMemo(() => {
        return Object.values(clientMap)
    },[clientMap] )


    const syncChats = useCallback(async() => { 
        if(isReady ){
            let isNewMessage = false
            const workerPromise = clients.map(async(client: ActiveClient) => {                
                const hasStarted = client.links.lastMessage

                if(hasStarted ){ 
                    const response = await StreamsService.fetchMessages(client)
                    if(response && response.messages.length) {
                        isNewMessage = true
                        setClient(response.client, response.messages)
                    }
                } else if(client.clientType === ClientType.SUBSCRIBER) {
                    const updatedClient = await StreamsService.getKeyloadLink(client)
                    if(updatedClient.links.lastMessage) {
                        setClient(updatedClient)
                    }
                }
            })

            await Promise.all(workerPromise)
            console.log("DONE------------------------------------------------------")
            if(isNewMessage) {
                try{
                    playNotificationSound()
                } catch(e){
                    console.error(e)
                }
            }
        }
    }, [clients, setClient])

    useInterval(syncChats, 5000)
}



