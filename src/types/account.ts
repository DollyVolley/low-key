import {ChannelDescription} from '@/types/channel'

export interface Account {
    name: string,
    seed: string, // @todo: encrypt and provide in Uint8[]
    channelDescriptions: ChannelDescription[]
}

