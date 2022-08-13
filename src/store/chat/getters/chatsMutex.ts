import { accountAtom } from "@/store/account";
import { mutexAtomFamily } from "@/store/utils/mutex";
import { selector } from "recoil";

export const chatsMutexSelector= selector<{[key in string]: boolean}>({
    key: 'chatsMutex', 
    get: ({get}) => {
      const account = get(accountAtom)

      const mutexStates: {[key in string]: boolean} = {}

      if(account){
        account.chatDescriptions.forEach(description => {
            mutexStates[description.chatID] = get(mutexAtomFamily(description.chatID))
        })
      }

      return mutexStates
    },

 });
