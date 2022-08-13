import {  ArchiveClient } from "@/logic/streams-service";
import { loadAndPersistCacheEffect } from "@/store/utils";
import { atomFamily } from "recoil";

export const archiveClientAtomFamily = atomFamily<ArchiveClient | null, string>({
    key: 'archiveClientAtomFamily',
    default: null,
    effects_UNSTABLE: [
      loadAndPersistCacheEffect
      ]
});