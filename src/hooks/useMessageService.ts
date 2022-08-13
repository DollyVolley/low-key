import { ClientType } from "@/logic/streams-service";
import { Client } from "@/logic/streams-service/lib/streams/streams";
import { accountAtom, isStreamsLoadedAtom } from "@/store";
import { allChatsSelector } from "@/store/chat/getters/allChats";
import { chatsMutexSelector } from "@/store/chat/getters/chatsMutex";
import { mutexAtomFamily } from "@/store/utils/mutex";
import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useChats } from "./useChats";
import { useInterval } from "./utils/useInterval";

export function useMessageService(){
    const isStreamsLoaded = useRecoilValue(isStreamsLoadedAtom)
    const allChats = useRecoilValue(allChatsSelector)
    const {syncMessages, checkChatStarted} = useChats()

    const chatsMutex = useRecoilValue(chatsMutexSelector)

    const getMutex = useRecoilCallback(({set}) => async (id: string) => {
        set(mutexAtomFamily(id), true)
    })

    const releaseMutex = useRecoilCallback(({set}) => async (id: string) => {
        set(mutexAtomFamily(id), false)
    })


    useInterval(syncChats, 5000)

    async function syncChats(){
        if(isStreamsLoaded ){
            allChats.forEach(chat => {
                if((!chat.client || !chat.data) || chatsMutex[chat.id]) return

                getMutex(chat.id)
                
                const hasStarted = chat.client.links.lastMessage
                if(hasStarted ){ 
                    syncMessages(chat)
                } else if(chat.client.clientType === ClientType.SUBSCRIBER) {
                    checkChatStarted(chat)
                }

                releaseMutex(chat.id)
            })
        }
    }
}