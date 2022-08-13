import { accountAtom } from "@/store/account";
import { chatDescriptionsSelector, currentChatIDAtom } from "@/store/chat";
import { Account } from "@/types/account";
import { ChatDescription } from "@/types/chat";
import { selector } from "recoil";


export const currentChatDescriptionSelector= selector<ChatDescription | null>({
  key: 'currentChannelDescriptionSelector', 
  get: ({get}) => {
    const chatID = get(currentChatIDAtom)
    const chatDescriptions = get(chatDescriptionsSelector)
    return chatDescriptions.find(cd => cd.chatID === chatID) || null
  },
  set: ({get, set, }, description) => { 

    const activeChat = description as ChatDescription
    const chatID = activeChat.chatID

    const descriptions = [...get(chatDescriptionsSelector)]
    const updatedDescriptions = [...descriptions.filter(cd => cd.chatID !== chatID), description] as ChatDescription[]
    const sortedDescriptions = updatedDescriptions.sort((a, b) => b.lastChange - a.lastChange )
    set(chatDescriptionsSelector, sortedDescriptions)

    const account = get(accountAtom) as Account
    set(accountAtom, {...account, chatDescriptions: updatedDescriptions})
  }
});

