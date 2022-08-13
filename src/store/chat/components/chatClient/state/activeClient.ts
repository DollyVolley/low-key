import {  ActiveClient } from "@/logic/streams-service";
import { atomFamily } from "recoil";

export const clientAtomFamily = atomFamily<ActiveClient | null, string>({
    key: 'clientAtomFamily',
    default: null
});