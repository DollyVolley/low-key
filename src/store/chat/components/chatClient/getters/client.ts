import { ActiveClient, StreamsService } from "@/logic/streams-service";
import { accountAtom } from "@/store/account/state";
import { isStreamsLoadedAtom } from "@/store/app";
import {  selectorFamily } from "recoil";
import { clientAtomFamily } from "../state/activeClient";
import { archiveClientAtomFamily } from "../state/archiveClient";

 export const clientSelectorFamily = selectorFamily({
  key: 'activeClientSelectorFamily',
  get: (id: string) => ({get}) => {

    let client = get(clientAtomFamily(id))
    if(client === null && get(isStreamsLoadedAtom)) {
      const account = get(accountAtom)
      const archiveClient = get(archiveClientAtomFamily(id))

      if(archiveClient) {
        client = StreamsService.importClient(archiveClient!, account.seed)
      }
    }

    return client
  },

  set: (id: string) => ({set, get}, newValue) => {
    set(clientAtomFamily(id), newValue)

    let archiveClient = null
    if(newValue !== null) {
      const account = get(accountAtom)
      archiveClient = StreamsService.exportClient(newValue as ActiveClient, account.seed)
    }

    set(archiveClientAtomFamily(id), archiveClient)
  },
});
