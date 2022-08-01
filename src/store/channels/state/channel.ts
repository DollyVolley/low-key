import { ActiveChannel } from "@/logic/message-service";
import { atomFamily } from "recoil";

export const channelAtomFamily = atomFamily<ActiveChannel | null, string>({
    key: 'channelAtomFamily',
    default: null,
    effects: []
});