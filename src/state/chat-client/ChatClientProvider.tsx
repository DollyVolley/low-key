import React, { FC, PropsWithChildren, useState, useMemo, useEffect } from "react";
import { ChatClientContext } from "./ChatClientContext";
import {ActiveClient, StreamsService} from '@/logic/streams-service'
import { useChatDataContext } from "../chat-data";
import { ChatMessage } from "@/types/chat";
import { ChatClientCache } from "@/logic/cache";

export const ChatClientProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const {addMessages, setChatStarted, account, allChatIDs } = useChatDataContext()
  const [clientMap, setClientMap] = useState<{[key in string]:ActiveClient}>({})
  const [isReady, setIsReady] = useState(false)
  const [isStreamsLoaded, setIsStreamsLoaded] = useState(false)

  const chatClientCache = new ChatClientCache()

  useEffect(() => {
    if(!isStreamsLoaded) {
      loadStreamsLibrary()
    } else {
      loadChatClients()
    }
  },[isStreamsLoaded])

  async function loadStreamsLibrary() {
    await StreamsService.loadStreams()
    setIsStreamsLoaded(true)
  }

  async function loadChatClients(){
    setIsReady(false)
    const loadedClients: Record<string, ActiveClient> = {}

    const loadingPromise = allChatIDs.map(async (id: string) => {
      const archiveClient = chatClientCache.get(id)
      if(!archiveClient){
        console.error(`Data Corrupted: Did not find client for ${id}.`)
      }

      const client = await StreamsService.importClient(archiveClient!, account.seed)
      loadedClients[id] = client
    })

    await Promise.all(loadingPromise)

    setClientMap(loadedClients)
    setIsReady(true)
  }


  async function setClient(client: ActiveClient, messages? : ChatMessage[]): Promise<void> {
    if(messages?.length) addMessages(client.id, messages)

    if(clientMap[client.id] && clientMap[client.id].index > client.index) {
      console.error('[CLIENT] oh no - i wanted to overwrite an advanced state')
      return
    }

    if(clientMap[client.id] && !clientMap[client.id].links.lastMessage && client.links.lastMessage) {
      setChatStarted(client.id)
    }
    
    setClientMap({
      ...clientMap,
      [client.id]: client
    })

    const archiveClient = await StreamsService.exportClient(client, account.seed)
    chatClientCache.set(archiveClient)
  }

  function removeClient(clientID: string) {
    const newClientMap = {...clientMap}
    delete newClientMap[clientID]
    setClientMap(newClientMap)
    chatClientCache.remove(clientID)
  }


  const contextValue = useMemo(
    () => ({
      clientMap,
      setClient,
      removeClient,
      isReady,
    }),
    [isReady, clientMap],
  );

  return <ChatClientContext.Provider value={contextValue}>{children}</ChatClientContext.Provider>;
};
  