import { ClientType } from "@/logic/streams-service";
import { MOCK_CHAT } from "@/mock/constants";
import { useChats } from "./useChats";
import { useInterval } from "./utils/useInterval";

export function useMessageService(){
    const isStreamsLoaded = false // @todo use global state
    const allChats = [MOCK_CHAT]
    const {syncMessages, checkChatStarted} = useChats()


    useInterval(syncChats, 5000)

    async function syncChats(){
        if(isStreamsLoaded ){
            allChats.forEach(chat => {
                if((!chat.client || !chat.data)) return
                
                const hasStarted = chat.client.links.lastMessage

                if(hasStarted ){ 
                    syncMessages(chat)
                } else if(chat.client.clientType === ClientType.SUBSCRIBER) {
                    checkChatStarted(chat)
                }

            
            })
        }
    }
}