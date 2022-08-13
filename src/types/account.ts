import {ChatDescription} from '@/types/chat'

export interface Account {
    name: string,
    seed: string, // @todo: encrypt and provide in Uint8[]
    channelDescriptions: ChatDescription[]
}

