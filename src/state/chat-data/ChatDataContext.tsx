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
    setCurrentChatID: (currentChatID: string) => {},
    setMessageSeen: (chatID: string) => {},
    setChatData: (chatData: ChatData) => {},
    addMessagesToChat: (chatID: string, messages?: ChatMessage[]) => {},
    isReady: false,
    setChatStarted: (chatID: string) => {},
});
