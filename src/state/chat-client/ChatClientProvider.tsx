import React, { FC, PropsWithChildren, useState, useMemo } from "react";
import { ChatClientContext } from "./ChatClientContext";
import {ActiveClient, StreamsService} from '@/logic/streams-service'
import { useChatDataContext } from "../chat-data";
import { ChatMessage } from "@/types/chat";
import { ChatClientCache } from "@/logic/cache";

export const ChatClientProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const {addMessagesToChat, account } = useChatDataContext()
  const [clientMap, setClientMap] = useState<{[key in string]:ActiveClient}>({})

  const chatClientCache = new ChatClientCache()


  async function setClient(client: ActiveClient, messages? : ChatMessage[]): Promise<void> {
    if(messages) addMessagesToChat(client.id, messages)
    
    setClientMap({
      ...clientMap,
      [client.id]: client
    })

    const archiveClient = await StreamsService.exportClient(client, account.seed)
    chatClientCache.set(archiveClient)
  }

  async function getClientByID(id: string): Promise<ActiveClient> {
    const client = clientMap[id]
    if(client) return client

    const archiveClient = chatClientCache.get(id)!

    const activeClient =  await StreamsService.importClient(archiveClient, account.seed)
    setClient(activeClient)
    return activeClient
  }


  const contextValue = useMemo(
    () => ({
      getClientByID,
      setClient,
    }),
    [],
  );

  return <ChatClientContext.Provider value={contextValue}>{children}</ChatClientContext.Provider>;
};
  