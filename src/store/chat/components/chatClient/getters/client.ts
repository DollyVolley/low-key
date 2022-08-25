import { ActiveClient, StreamsActor, StreamsService } from "@/logic/streams-service";
import { accountAtom } from "@/store/account/state";
import { isStreamsLoadedAtom } from "@/store/app";
import {  selectorFamily } from "recoil";
import { clientAtomFamily } from "../state/activeClient";
import { archiveClientAtomFamily } from "../state/archiveClient";

 export const clientSelectorFamily = selectorFamily({
  key: 'activeClientSelectorFamily',
  get: (id: string) => async({get}) => {

    let client = get(clientAtomFamily(id))
    if(!client) {
      const account = get(accountAtom)
      const archiveClient = get(archiveClientAtomFamily(id))

      if(archiveClient && get(isStreamsLoadedAtom)) {
        client = await StreamsService.importClient(archiveClient!, account.seed)
      } else {
        client = {
          ...archiveClient!,
          streamsClient: null as unknown as StreamsActor // @todo: that is horribly wrong, just fix for the moment
        }
      }
    }

    return client
  },

  set: (id: string) => async ({set, get}, newValue) => {
    set(clientAtomFamily(id), newValue)

    let archiveClient = null

    if(newValue !== null && (newValue as ActiveClient).streamsClient) {
      const account = get(accountAtom)
      archiveClient = await StreamsService.exportClient(newValue as ActiveClient, account.seed)
    }

    // only set when archive client exists (in case streams was not loaded yet) or reset (newValue === null)
    if(!newValue || archiveClient) {
      set(archiveClientAtomFamily(id), archiveClient)
    }
  },
});
