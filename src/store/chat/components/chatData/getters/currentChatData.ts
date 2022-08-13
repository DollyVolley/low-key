import { selector } from "recoil";
import { currentChatIDAtom } from "../state";
import { chatDataAtomFamily } from "../state/chatData";

export const currentChatDataSelector= selector({
    key: 'currentChatDataSelector', 
    get: ({get}) => {
      const chatID = get(currentChatIDAtom)
      return get(chatDataAtomFamily(chatID))
    },
    set: ({get, set }, chatData) => { 
      const chatID = get(currentChatIDAtom)

      set(chatDataAtomFamily(chatID), chatData)
    }
 });
