import { accountAtom } from "@/store/account";
import { currentChannelIDAtom } from "@/store/channels";
import { Account } from "@/types/account";
import { ChannelDescription } from "@/types/channel";
import { GetRecoilValue, selector, SetRecoilState } from "recoil";
import { channelDescriptionsSelector } from "../state";


export const currentChannelDescriptionSelector= selector<ChannelDescription | null>({
  key: 'currentChannelDescriptionSelector', 
  get: ({get}) => {
    const channelID = get(currentChannelIDAtom)
    const channelDescriptions = get(channelDescriptionsSelector)
    return channelDescriptions.find(cd => cd.channelID === channelID) || null
  },
  set: ({get, set, }, description) => { 
    if(!description) {
      removeCurrentChannelDescription(get, set)
      return
    }

    const activeChannel = description as ChannelDescription
    const channelID = activeChannel.channelID

    const descriptions = [...get(channelDescriptionsSelector)]
    const updatedDescriptions = [...descriptions.filter(cd => cd.channelID !== channelID), description] as ChannelDescription[]
    const sortedDescriptions = updatedDescriptions.sort((a, b) => b.lastChange - a.lastChange )
    set(channelDescriptionsSelector, sortedDescriptions)

    const account = get(accountAtom) as Account
    set(accountAtom, {...account, channelDescriptions: updatedDescriptions})
  }
});

function removeCurrentChannelDescription(get: GetRecoilValue, set: SetRecoilState): void {
  const currentChannelID = get(currentChannelIDAtom)
  const descriptions = get(channelDescriptionsSelector)
  const updatedDescriptions = descriptions.filter(cd => cd.channelID !== currentChannelID)
  set(channelDescriptionsSelector, updatedDescriptions)
}