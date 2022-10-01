import { Account } from "@/types/account";
import { ChatData, ChatDescription, ChatMessage } from "@/types/chat";

export interface ChatDataOption {
  account: Account,
  currentChatData: ChatData,
  currentChatID: string,
  allChatIDs: string[],
  chatDescriptions: ChatDescription[],
  chatDataMap: {[key: string]: ChatData},
  setCurrentChatID: (currentChatID: string) => void,
  addMessages: (chatID: string, messages: ChatMessage[]) => void,
  setMessageSeen: (chatID: string) => void,
  removeChatData: (chatID: string) => void,
  setChatData: (chatData: ChatData) => void,
  setChatStarted: (chatID: string) => void,
  isReady: boolean
}