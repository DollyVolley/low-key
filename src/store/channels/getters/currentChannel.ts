import { ActiveChannel, MessageService } from "@/logic/message-service";
import { accountAtom } from "@/store/account";
import { currentChannelDescriptionSelector } from "@/store/channelDescriptions/getters";
import { describeChannel } from "@/utils/channel";
import { GetRecoilValue, selector, SetRecoilState } from "recoil";
import { currentChannelIDAtom } from "../state";
import { channelAtomFamily } from "../state/channel";
import { ChannelCache } from "@/logic/cache";
import { channelDescriptionsSelector } from "@/store/channelDescriptions";

export const currentChannelSelector= selector({
    key: 'currentChannelSelector', 
    get: ({get}) => {
      const channelID = get(currentChannelIDAtom)
      if(!channelID) return null

      let activeChannel = get(channelAtomFamily(channelID))

      if(!activeChannel) {
        activeChannel = loadChannel(get, channelID)
      }

      return activeChannel
    },
    set: ({get, set }, channel) => { 
      if(!channel){
        removeCurrentChannel(get, set)
        return
      }

      const activeChannel = channel as ActiveChannel
      const channelID = activeChannel.channelID

      set(channelAtomFamily(channelID), activeChannel)
      set(currentChannelDescriptionSelector, describeChannel(activeChannel))

      set(currentChannelIDAtom, channelID)

      persistChannel(get, activeChannel)
    }
 });

 function loadChannel(get: GetRecoilValue, channelID: string): ActiveChannel {
  const channelCache = new ChannelCache()
  const archiveChannel = channelCache.get(channelID)
  if(!archiveChannel) throw new Error("Channel not found, id: " + channelID)    
  
  const password = get(accountAtom).seed
  const channel = MessageService.importChannel(archiveChannel, password)
  console.info(`[Load Channel]: ${channel.name} (${channel.links.lastMessage? 'active': 'staged'}) with ${channel.messages.length} messages`)
  return channel
}

function persistChannel(get: GetRecoilValue, channel: ActiveChannel): void {
  const channelCache = new ChannelCache()
  const password = get(accountAtom).seed

  console.info(`[Persist Channel: ${channel.name} (${channel.links.lastMessage? 'active': 'staged'}) with ${channel.messages.length} messages`)

  const archiveChannel = MessageService.exportChannel(channel, password)
  channelCache.set(archiveChannel)
}

function removeCurrentChannel(get: GetRecoilValue, set: SetRecoilState): void {
  const currentChannelID = get(currentChannelIDAtom)
  const channelCache = new ChannelCache()
  channelCache.remove(currentChannelID)

  set(currentChannelDescriptionSelector, null)

  set(currentChannelIDAtom, '')

}

