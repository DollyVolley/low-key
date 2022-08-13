import { accountAtom } from "@/store/account";
import { Chat } from "@/types/chat";
import { selector } from "recoil";
import { chatSelectorFamily } from "./chat";

export const allChatsSelector= selector<Chat[]>({
    key: 'allChatsSelector', 
    get: ({get}) => {
      const account = get(accountAtom)
      const chats: Chat[] = []
      if(account) {
        account.chatDescriptions.forEach(description => {
          chats.push(get(chatSelectorFamily(description.chatID)))
        })
      }
      return chats
    },
 });
