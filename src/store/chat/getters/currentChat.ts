import { Chat } from "@/types/chat";
import { selector } from "recoil";
import { currentChatIDAtom } from "../state";
import { chatSelectorFamily } from "./chat";

export const currentChatSelector= selector<Chat>({
    key: 'currentChatSelector', 
    get: ({get}) => {
      const chatID = get(currentChatIDAtom)
      return get(chatSelectorFamily(chatID))
    },
    set: ({get, set}, updatedChat) => {
      const chatID = get(currentChatIDAtom)
      set(chatSelectorFamily(chatID), updatedChat)
    }
 });
