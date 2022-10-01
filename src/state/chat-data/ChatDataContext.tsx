import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { ChatDataOption } from './types';
import {ChatData, ChatDescription, ChatMessage} from '@/types/chat'
import { Account } from '@/types/account';

export const ChatDataContext = createContext<ChatDataOption>({
    account: {} as Account,
    currentChatData: {} as ChatData,
    currentChatID: "",
    allChatIDs: [],
    chatDescriptions: [],
    chatDataMap:{},
    setCurrentChatID: (currentChatID: string) => {},
    setMessageSeen: (chatID: string) => {},
    setChatData: (chatData: ChatData) => {},
    addMessages: (chatID: string, messages?: ChatMessage[]) => {},
    removeChatData: (chatID: string) => {},
    isReady: false,
    setChatStarted: (chatID: string) => {},
});
