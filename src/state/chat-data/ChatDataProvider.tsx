import { init } from "@/logic/streams-service/lib/streams/streams";
import { Account } from "@/types/account";
import { ChatData, ChatDescription, ChatMessage } from "@/types/chat";
import { describeChat } from "@/utils/channel";
import React, { FC, PropsWithChildren, useState, useMemo, useEffect } from "react";
import { ChatDataContext } from "./ChatDataContext";

export const ChatDataContextProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [account, setAccount] = useState<Account>({} as Account)  
  const [currentChatID, setCurrentChatID] = useState("");
  const [allChatIDs, setAllChatIDs] = useState([])
  const [chatDataMap, setChatDataMap] = useState<{[key in string]: ChatData}>({})
  const [chatDescriptionMap, setChatDescriptionMap] = useState<{[key in string]: ChatDescription}>({})
  const [isReady, setIsReady] = useState(false)

  useEffect(function init() {
    initAccount()
    setIsReady(true)
  },[])

  function initAccount(): void {
    setAccount()
    setAllChatIDs()
    setChatDescriptionMap()
    setChatDataMap()
  }

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
    // @todo persist
  }

  function setChatDescription(chatData: ChatData): void {
    setChatDescriptionMap({
      ...chatDescriptionMap,
      [chatData.id]: describeChat(chatData)
    })

    // @todo persist
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
  