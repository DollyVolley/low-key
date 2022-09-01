import { ActiveClient } from '@/logic/streams-service';
import React, { createContext } from 'react';
import { ChatClientOption } from './types';

export const ChatClientContext = createContext<ChatClientOption>({
    currentClient: {} as ActiveClient,
    getClientByID: (id: string) => ({} as Promise<ActiveClient>),
    setClient: (client: ActiveClient) => ({} as Promise<void>) 
});

