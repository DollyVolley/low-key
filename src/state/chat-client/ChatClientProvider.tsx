import React, { FC, PropsWithChildren, useState, useMemo } from "react";
import { ChatClientContext } from "./ChatClientContext";
import {ActiveClient} from '@/logic/streams-service'
import { useChatDataContext } from "../chat-data";
import { ChatMessage } from "@/types/chat";

export const ChatClientProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const {currentChatID, addMessagesToChat } = useChatDataContext()
  const [clientMap, setClientMap] = useState<{[key in string]:ActiveClient}>({})

  const currentClient = useMemo(() => {
    clientMap[currentChatID]
  }, [currentChatID])


  async function setClient(client: ActiveClient, messages? : ChatMessage[]): Promise<void> {
    if(messages) addMessagesToChat(client.id, messages)
    
    setClientMap({
      ...clientMap,
      [client.id]: client
    })

    // @todo export and persist
  }

  async function getClientByID(id: string): Promise<ActiveClient> {
    const client = clientMap[id]
    if(client) return client

    // @todo load and import client
    // @todo set client in map
  }


  const contextValue = useMemo(
    () => ({
      currentClient,
      getClientByID: (id: string) => Promise<ActiveClient>,
      setClient,
    }),
    [],
  );

  return <ChatClientContext.Provider value={contextValue}>{children}</ChatClientContext.Provider>;
};
  