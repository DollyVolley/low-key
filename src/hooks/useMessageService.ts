import { ClientType } from "@/logic/streams-service";
import { isStreamsLoadedAtom } from "@/store";
import { allChatsSelector } from "@/store/chat/getters/allChats";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useChats } from "./useChats";
import { useInterval } from "./utils/useInterval";

export function useMessageService(){
    const isStreamsLoaded = useRecoilValue(isStreamsLoadedAtom)
    const allChats = useRecoilValue(allChatsSelector)
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