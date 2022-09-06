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
  const [allChatIDs, setAllChatIDs] = useState<string[]>([])
  const [chatDataMap, setChatDataMap] = useState<{[key in string]: ChatData}>({})
  const [chatDescriptionMap, setChatDescriptionMap] = useState<{[key in string]: ChatDescription}>({})
  const [isReady, setIsReady] = useState(false)

  const accountCache = new AccountCache()
  const chatDataCache = new ChatDataCache()


  useEffect(function init() {
    loadAccount()
    loadChatData()
    setIsReady(true)
  },[])

  const currentChatData = useMemo(() => {
    return chatDataMap[currentChatID]
  }, [currentChatID])

  const allChatDescriptions = useMemo(() => {
    return Object.values(chatDescriptionMap)
  }, [chatDescriptionMap])

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

  function getChatDataByID(id: string): ChatData {
    return chatDataMap[id]
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
    }

    setAccount(account)
    const chatDescriptionMap: Record<string, ChatDescription> = {}
    account.chatDescriptions.forEach((chatDescription: ChatDescription) => {
      chatDescriptionMap[chatDescription.chatID] = chatDescription
    })
    setChatDescriptionMap(chatDescriptionMap)
    setAllChatIDs(account.chatDescriptions.map((chatDescription: ChatDescription) => chatDescription.chatID))
  }

  function loadChatData() {
    const loadedChatDataMap: Record<string, ChatData> = {}
    allChatIDs.forEach((chatID: string) => {
        loadedChatDataMap[chatID] = chatDataCache.get(chatID)!
    })
    setChatDataMap(loadedChatDataMap)
  }


  const contextValue = useMemo(
    () => ({
      account,
      currentChatData,
      currentChatID,
      allChatIDs,
      chatDescriptions: allChatDescriptions,
      getChatDataByID,
      setCurrentChatID,
      addMessagesToChat,
      setMessageSeen,
      setChatData,
      isReady
    }),
    [],
  );

  return <ChatDataContext.Provider value={contextValue}>{children}</ChatDataContext.Provider>;
};
  