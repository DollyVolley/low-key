import React, { FC, PropsWithChildren, useState, useMemo, useEffect } from "react";
import { AccountCache, ChatDataCache } from "@/logic/cache";
import {generateSeed} from "@/logic/streams-service";
import { Account } from "@/types/account";
import { ChatData, ChatDescription, ChatMessage } from "@/types/chat";
import { describeChat } from "@/utils/channel";
import { ChatDataContext } from "./ChatDataContext";

export const ChatDataContextProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [account, setAccount] = useState<Account>({} as Account)  
  const [currentChatID, setCurrentChatID] = useState("");
  const [chatDataMap, setChatDataMap] = useState<{[key in string]: ChatData}>({})
  const [chatDescriptionMap, setChatDescriptionMap] = useState<{[key in string]: ChatDescription}>({})
  const [isReady, setIsReady] = useState(false)

  const accountCache = new AccountCache()
  const chatDataCache = new ChatDataCache()


  useEffect(function init() {
    loadAccount()
    setIsReady(true)
  },[])

  const currentChatData = useMemo(() => {
    return chatDataMap[currentChatID]
  }, [currentChatID])

  const allChatDescriptions = useMemo(() => {
    return Object.values(chatDescriptionMap) || []
  }, [chatDescriptionMap])

  const allChatIDs = useMemo(() => {
    if(!Object.values(account).length) return []
    return account.chatDescriptions.map((description: ChatDescription) => description.chatID)
  }, [account])

  function setChatData(chatData: ChatData): void {
    setChatDataMap({
      ...chatDataMap,
      [chatData.id]: chatData,
    })

    setChatDescription(chatData)
    chatDataCache.set(chatData)
  }

  function setChatDescription(chatData: ChatData): void {
    setChatDescriptionMap({
      ...chatDescriptionMap,
      [chatData.id]: describeChat(chatData)
    })

    accountCache.set({
      ...account,
      chatDescriptions: Object.values(chatDescriptionMap)
    })
  }  

  function setMessageSeen(id: string): void {
    setChatData({
      ...chatDataMap[id],
      isNewMessage: false,
    })
  }

  function addMessagesToChat(chatID: string, messages: ChatMessage[]) {
    setChatData({
      ...chatDataMap[chatID],
      messages: [...chatDataMap[chatID].messages, ...messages]
    })
  }

  function loadAccount(){
    let account = accountCache.get()
    if(!account) {
      account = {
        seed: generateSeed(81),
        chatDescriptions: [],
        name: 'New User'
      }

      accountCache.set(account)
    }

    setAccount(account)
    const chatDescriptionMap: Record<string, ChatDescription> = {}
    account.chatDescriptions.forEach((chatDescription: ChatDescription) => {
      chatDescriptionMap[chatDescription.chatID] = chatDescription
    })
    setChatDescriptionMap(chatDescriptionMap)

    loadChatData(account.chatDescriptions.map(description => description.chatID))
  }

  function loadChatData(chatIDs: string[]) {
    const loadedChatDataMap: Record<string, ChatData> = {}

    chatIDs.forEach((id: string) => {
      loadedChatDataMap[id] = chatDataCache.get(id)!
    })

    setChatDataMap(loadedChatDataMap)
  }

  function setChatStarted(chatID: string) {
    setChatData({
      ...chatDataMap[chatID],
      isStarted: true
    })
  }

  const contextValue = useMemo(
    () => ({
      account,
      currentChatData,
      currentChatID,
      allChatIDs,
      chatDescriptions: allChatDescriptions,
      setCurrentChatID,
      addMessagesToChat,
      setMessageSeen,
      setChatData,
      setChatStarted,
      isReady
    }),
    [account, currentChatID, chatDataMap, chatDescriptionMap, isReady],
  );

  return <ChatDataContext.Provider value={contextValue}>{children}</ChatDataContext.Provider>;
};
  