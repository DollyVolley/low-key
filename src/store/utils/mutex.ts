import {  atomFamily } from "recoil";

export const mutexAtomFamily = atomFamily<boolean, string>({
    key: 'mutex',
    default: false,
  });