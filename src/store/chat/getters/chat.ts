import { ActiveClient } from "@/logic/streams-service";
import { Chat, ChatData } from "@/types/chat";
import { describeChannel } from "@/utils/channel";
import { DefaultValue, selectorFamily } from "recoil";
import { chatDataAtomFamily, chatDescriptionsSelector, clientSelectorFamily, currentChatDescriptionSelector } from "../components";

export const chatSelectorFamily= selectorFamily<Chat, string>({
    key: 'chatSelectorFamily', 
    get: (id) => ({get}) => {
      const data = get(chatDataAtomFamily(id))
      const client = get(clientSelectorFamily(id))
      const chat: Chat = {data: data as ChatData, client: client as ActiveClient, id}
      return chat
    },
    set: (id) => ({set, get}, chat) => {
      if(chat instanceof DefaultValue) return
      set(chatDataAtomFamily(id), chat.data)
      set(clientSelectorFamily(id), chat.client)
      if(!chat.data && !chat.client){
        const chatDescriptions = get(chatDescriptionsSelector)
        set(chatDescriptionsSelector, chatDescriptions!.filter(description => description.chatID !== id))
      } else {
        set(currentChatDescriptionSelector, describeChannel(chat))
      }
    }
 });
