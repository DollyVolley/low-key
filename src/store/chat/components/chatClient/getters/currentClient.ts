import { selector } from "recoil";
import { currentChatIDAtom } from "../../chatData";
import { clientSelectorFamily } from "./client";


export const currentClientSelector= selector({
    key: 'currentClientSelector', 
    get: ({get}) => {
      const chatID = get(currentChatIDAtom)
      return get(clientSelectorFamily(chatID))
    },
    set: ({get, set }, channel) => { 
      const chatID = get(currentChatIDAtom)
      set(clientSelectorFamily(chatID), channel)
    }
 });
