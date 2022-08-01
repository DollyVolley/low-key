import { ActiveChannel  } from "@/logic/message-service";
import { ChannelDescription } from "@/types/channel";

export function describeChannel(channel: ActiveChannel): ChannelDescription {
    let lastMessage = undefined
    let lastChange = Date.now()

    if(channel.messages.length) {
        lastMessage = channel.messages[channel.messages.length - 1]
        lastChange = lastMessage.timestamp
    }

    return {
        name: channel.name,
        channelID: channel.channelID,
        lastMessage,
        lastChange,
        started: !!channel.links.lastMessage 
    }
}